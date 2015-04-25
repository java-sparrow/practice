package com.xlst.ui;

import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

import com.xlst.logic.Msgcmn;

public class ErrorTip extends JFrame implements ActionListener {
//	private String[] inetAddress = {"116", "10", "71", "3"};
	private String[] inetAddress = Msgcmn.serverAddress.split("\\.");
	private JTextField[] address = new JTextField[4];
	private ErrorTip errorJFrame = this;
	
	public ErrorTip(){}
	
	public ErrorTip(String errorInfo, boolean addInetAddress){
		this.setTitle("出错啦");
		this.setSize(300, 200);
		this.setLocationRelativeTo(null);
		Box outerBox = Box.createVerticalBox();
		this.getContentPane().add(outerBox);
		
		Box errorInfoBox = Box.createHorizontalBox();
		Box inetAddressBox = Box.createHorizontalBox();
		Box sureBox = Box.createHorizontalBox();
		
		Dimension topSpace = new Dimension(260,20);
		Dimension middleSpace = new Dimension(260,20);
		Dimension bottomSpace = new Dimension(260,20);
		Dimension leftSpace = new Dimension(20,20);
		Dimension rightSpace = leftSpace;
		
		outerBox.add(Box.createRigidArea(topSpace));
		outerBox.add(errorInfoBox);
		
		if(addInetAddress){
			outerBox.add(Box.createRigidArea(middleSpace));
			outerBox.add(inetAddressBox);
			outerBox.add(Box.createRigidArea(middleSpace));
			outerBox.add(sureBox);
			
			inetAddressBox.add(Box.createHorizontalGlue());
			inetAddressBox.add(new JLabel("端口号 : "));
			for(int i=0; i<4; i++){
				address[i] = new JTextField(inetAddress[i]);
				address[i].setColumns(3);
				address[i].setMaximumSize(new Dimension(30,25));
				address[i].setHorizontalAlignment(JTextField.CENTER);
				inetAddressBox.add(address[i]);
				if(i != 3)inetAddressBox.add(new JLabel(" . "));
			}
			inetAddressBox.add(Box.createHorizontalGlue());
			
			JButton login = new JButton("确定更换");
			sureBox.add(login);
			login.addActionListener(this);
		}
		
		outerBox.add(Box.createRigidArea(bottomSpace));
		
		errorInfoBox.add(Box.createRigidArea(leftSpace));
		errorInfoBox.add(new JLabel("错误信息 : " + errorInfo));
		errorInfoBox.add(Box.createRigidArea(rightSpace));
		
		this.pack();
		this.setResizable(false);
		this.setVisible(true);
		
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we){
//				errorJFrame.setVisible(false);
				errorJFrame.dispose();
			}
		});
	}
	
	public JTextField[] getAddress(){
		return this.address;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if(e.getActionCommand().equals("确定更换")){
			Msgcmn.setServerAddress(this);
			this.setVisible(false);
		}
	}
}
