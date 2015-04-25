package com.xlst.logic;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

import com.xlst.ui.ErrorTip;
import com.xlst.ui.Main;
import com.xlst.ui.NewMsgTip;

public class ReturnInfoThread implements Runnable {
	private Socket socket;
	private BufferedReader in = null;
	private boolean keep = true;
	
	private Main mainJFrame = null;
	private NewMsgTip newMsgTip = null;
	
	public ReturnInfoThread(){}
	
	public ReturnInfoThread(Socket socket){
		this.socket = socket;
	}

	public void setMainJFrame(Main mainJFrame) {
		this.mainJFrame = mainJFrame;
	}

	public void setNewMsgTip(NewMsgTip newMsgTip) {
		this.newMsgTip = newMsgTip;
	}

	@Override
	public void run() {
		try {
			in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
			
			while(keep){
				String inMsg = null;
				
				try {
					do{
						inMsg = in.readLine();
					}while(inMsg == null && keep);
					
//					System.out.println("ReturnInfoThread.run()--->inMsg: " + inMsg);
					if("returnInfo".equals(inMsg)){
						mainJFrame.setTipText(in.readLine());
					}else if("newMessage".equals(inMsg)){
						if(newMsgTip == null){
							newMsgTip = new NewMsgTip(in.readLine());
						}else{
							newMsgTip.setTipText(in.readLine());
							newMsgTip.setVisible(true);
						}
					}else if("logoutOK".equals(inMsg)){
						break;
					}
					
				} catch (IOException e) {
//					e.printStackTrace();
//					System.out.println("break in ReturnInfoThread.run()");
					new ErrorTip("±§Ç¸£¬³ÌÐòÓöµ½Î´Öª´íÎó£¡", false);
					break;
				}
			}
		} catch (IOException e) {
//			e.printStackTrace();
			new ErrorTip("±§Ç¸£¬³ÌÐòÓöµ½Î´Öª´íÎó£¡", false);
		}
	}
	
	public void breakKeep(){
		keep = false;
	}

}
