package com.xlst.logic;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import javax.swing.JTextField;

import com.xlst.ui.ErrorTip;
import com.xlst.ui.Login;
import com.xlst.ui.Main;
import com.xlst.ui.NewMsgTip;

public class Msgcmn {
	static Login loginJFrame;
	static Main mainJFrame = null;
	static NewMsgTip newMsgTip = null;
//	static ErrorTip errorJFrame;
	public static String serverAddress = "116.10.70.153";
	public static final boolean ADD_ADDRESS = true;
	public static final boolean NO_ADDRESS = false;
	public static final boolean SHOW_LOGIN = true;
	public static final boolean EXIT = false;
	
	private static BufferedReader in = null;
	private static BufferedWriter out = null;
	
	private static ReturnInfoThread returnInfoThread = null;
	
	private static String uuid = null;
	
	public static void main(String[] args) {
		start();
	}
	
	public static void start(){
		loginJFrame = new Login();
	}
	
	public static boolean login(String uname, String pwd){
		Socket socket = null;
		try {
			socket = new Socket(InetAddress.getByName("localhost"), 8282);
//			socket = new Socket(InetAddress.getByName(serverAddress), 8282);
//			System.out.println("socket bulid");
//			socket = new Socket(InetAddress.getLocalHost(), 8282);
			in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
			out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
			
			out.write(uname + "\n");
			out.write(pwd + "\n");
			out.flush();
			
			String responseInfo = null;
			do{
				responseInfo = in.readLine();
			}while(responseInfo == null);
			
			String errorInfo = null;
			if("error".equals(responseInfo.trim())){
				errorInfo = in.readLine();
//				System.out.println(errorInfo);
				//show error JFrame
				new ErrorTip(errorInfo, NO_ADDRESS);
//				errorJFrame = new ErrorTip(errorInfo, NO_ADDRESS);
			}else if("success".equals(responseInfo.trim())){
				loginJFrame.setVisible(false);
				
				if(mainJFrame == null){
					mainJFrame = new Main();
				}else{
					mainJFrame.setVisible(true);
				}
				
				mainJFrame.setTipText(in.readLine());
				
//				System.out.println("登录成功");
				if("uuid".equals(in.readLine())){
					uuid = in.readLine();
				}
//				dealReturnInfo();
				
				returnInfoThread = new ReturnInfoThread(socket);
				returnInfoThread.setMainJFrame(mainJFrame);
				returnInfoThread.setNewMsgTip(newMsgTip);
				
				new Thread(returnInfoThread).start();
				
			}
			
		} catch (UnknownHostException e) {
//			e.printStackTrace();
			new ErrorTip("服务器地址错误，请输入有效的服务器地址重试！", ADD_ADDRESS);
		} catch (IOException e) {
//			e.printStackTrace();
			new ErrorTip("找不到服务器，请更换服务器地址重试！", ADD_ADDRESS);
		}
		
		return false;
	}
	
	public static void logout(boolean showLogin){
		if(showLogin){
			loginJFrame.setVisible(true);
		}
		
		returnInfoThread.breakKeep();
		
		try {
			out.write("logout" + "\n");
			out.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void setServerAddress(ErrorTip errorJFrame){
		JTextField[] address = errorJFrame.getAddress();
		
		String newAddress = address[0].getText().trim() + "." + address[1].getText().trim() + "." +
							address[2].getText().trim() + "." + address[3].getText().trim();

		serverAddress = newAddress;
	}
	
//	public static void dealReturnInfo(){
//		while(true){
//			String inMsg = null;
//			
//			try {
//				do{
//					inMsg = in.readLine();
//				}while(inMsg == null);
//				
//				if("returnInfo".equals(inMsg)){
//					mainJFrame.setTipText(in.readLine());
//				}else if("newMessage".equals(inMsg)){
//					if(newMsgTip == null){
//						newMsgTip = new NewMsgTip(in.readLine());
//					}else{
//						newMsgTip.setTipText(in.readLine());
//					}
//				}
//				
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
//	}
	
	public static void send(String receiver, String title, String details){
		try {
			out.write("receiver" + "\n");
			out.write(receiver + "\n");
//			System.out.println("k:receiver--->" + receiver);
			
			out.write("title" + "\n");
			out.write(title + "\n");
//			System.out.println("k:title--->" + title);
			
			out.write("details" + "\n");
			out.write(details + "\n");
//			System.out.println("k:details--->" + details);
//			out.newLine();
			out.write(uuid + "\n");
			out.flush();
		} catch (IOException e) {
//			e.printStackTrace();
//			System.out.println("Msgcmn.send() error..");
			new ErrorTip("抱歉，程序遇到未知错误！", NO_ADDRESS);
		}
//		System.out.println("Msgcmn.send()");
	}
}
