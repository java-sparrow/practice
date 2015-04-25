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
import javax.swing.JPasswordField;
import javax.swing.JTextField;

import com.xlst.logic.Msgcmn;

public class Login extends JFrame implements ActionListener {
	JTextField unameText;
	JPasswordField pwdText;
	JButton login;
	
	public Login(){
		this.setTitle("login xlst");
		this.setSize(270, 210);
		this.setLocationRelativeTo(null);
		this.setResizable(false);
		Box outerBox = Box.createVerticalBox();
		this.getContentPane().add(outerBox);
		
		Box lineOneBox = Box.createHorizontalBox();
		Box lineTwoBox = Box.createHorizontalBox();
		Box lineThreeBox = Box.createHorizontalBox();
		
		Dimension topSpace = new Dimension(260,30);
		Dimension middleSpace = new Dimension(260,20);
		Dimension bottomSpace = new Dimension(260,20);
		Dimension leftSpace = new Dimension(20,30);
		Dimension rightSpace = leftSpace;
		Dimension textSpace = new Dimension(10,30);
		
		outerBox.add(Box.createRigidArea(topSpace));
		outerBox.add(lineOneBox);
		outerBox.add(Box.createRigidArea(middleSpace));
		outerBox.add(lineTwoBox);
		outerBox.add(Box.createRigidArea(middleSpace));
		outerBox.add(lineThreeBox);
		outerBox.add(Box.createRigidArea(bottomSpace));

		lineOneBox.add(Box.createRigidArea(leftSpace));
		lineOneBox.add(new JLabel("ÕÊ ºÅ : "));
		lineOneBox.add(Box.createRigidArea(textSpace));
		unameText = new JTextField("xlst");
		lineOneBox.add(unameText);
		lineOneBox.add(Box.createRigidArea(rightSpace));

		lineTwoBox.add(Box.createRigidArea(leftSpace));
		lineTwoBox.add(new JLabel("ÃÜ Âë : "));
		lineTwoBox.add(Box.createRigidArea(textSpace));
		pwdText = new JPasswordField("abc");
		lineTwoBox.add(pwdText);
		lineTwoBox.add(Box.createRigidArea(rightSpace));
		
		login = new JButton("µÇ    Â¼");
		lineThreeBox.add(login);
		login.addActionListener(this);
		
		this.pack();
		this.setVisible(true);
		
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we){
				System.exit(0);
			}
		});
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if(e.getActionCommand().equals("µÇ    Â¼")){
			Msgcmn.login(unameText.getText().trim(), (new String(pwdText.getPassword())).trim());
//			Msgcmn.showMainJFrame();
		}
	}
}
