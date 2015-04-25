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

public class NewMsgTip extends JFrame {
	private NewMsgTip newMsgTip = this;
	private JLabel tipJLabel = null;
	
	public NewMsgTip(){}
	
	public NewMsgTip(String tipInfo){
		this.setTitle("新消息提示");
		this.setSize(300, 200);
		this.setLocationRelativeTo(null);
		Box outerBox = Box.createVerticalBox();
		this.getContentPane().add(outerBox);
		
		Box newMsgTipBox = Box.createHorizontalBox();
		
		Dimension topSpace = new Dimension(260,20);
		Dimension bottomSpace = new Dimension(260,20);
		
		outerBox.add(Box.createRigidArea(topSpace));
		outerBox.add(newMsgTipBox);
		outerBox.add(Box.createRigidArea(bottomSpace));
		
		tipJLabel = new JLabel(tipInfo);
		newMsgTipBox.add(tipJLabel);
		
		this.pack();
		this.setResizable(false);
		this.setVisible(true);
		
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we){
//				newMsgTip.setVisible(false);
				newMsgTip.dispose();
			}
		});
	}
	
	public void setTipText(String tipInfo){
		tipJLabel.setText(tipInfo);
	}
}
