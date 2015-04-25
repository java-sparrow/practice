package com.xlst.ui;

import java.awt.BorderLayout;
import java.awt.CardLayout;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;

import com.xlst.logic.Msgcmn;

public class Main extends JFrame implements ActionListener {
	JPanel CenterPanel;
	CardLayout cardLayout;
	JTextArea tipText;
	JTextField receiverJText;
	JTextField titleJText;
	JTextArea detailsJText;
	
	public Main(){
		this.setTitle("用户帐号");
		this.setSize(560, 450);
		this.setLocationRelativeTo(null);		//	make it show center!
		this.setResizable(false);
		
		Container containerPane = this.getContentPane();
		containerPane.setLayout(new BorderLayout());
		
		JPanel leftPanel = new JPanel();
		cardLayout = new CardLayout();
		CenterPanel = new JPanel(cardLayout);
		
		containerPane.add("West", leftPanel);
		containerPane.add("Center", CenterPanel);
		
		Box leftBox = Box.createVerticalBox();
		leftPanel.add(leftBox);
		
		Dimension topSpace = new Dimension(20,30);
		Dimension middleSpace = new Dimension(20,20);
		Dimension bottomSpace = new Dimension(20,20);
		
		JButton wtireButton = new JButton("写    信");
		JButton inboxButton = new JButton("收件箱");
		JButton outboxButton = new JButton("发件箱");
		JButton logoutButton = new JButton("退    出");
		wtireButton.addActionListener(this);
		inboxButton.addActionListener(this);
		outboxButton.addActionListener(this);
		logoutButton.addActionListener(this);
		
		leftBox.add(Box.createRigidArea(topSpace));
		leftBox.add(wtireButton);
		leftBox.add(Box.createRigidArea(middleSpace));
		leftBox.add(inboxButton);
		leftBox.add(Box.createRigidArea(middleSpace));
		leftBox.add(outboxButton);
		leftBox.add(Box.createRigidArea(middleSpace));
		leftBox.add(logoutButton);
		leftBox.add(Box.createRigidArea(bottomSpace));
		
		JPanel wellcomePanel = new JPanel(new BorderLayout());
		JPanel writePanel = new JPanel();
		JPanel inboxPanel = new JPanel();
		JPanel outboxPanel = new JPanel();
		
		CenterPanel.add(wellcomePanel, "welcome");
		CenterPanel.add(writePanel, "write");
		CenterPanel.add(inboxPanel, "inbox");
		CenterPanel.add(outboxPanel, "outbox");
		
		Insets insets = new Insets(40,40,20,20);		//	↑ ← ↓ →
		tipText = new JTextArea(2,20);
		tipText.setMargin(insets);
		tipText.setEditable(false);
		tipText.setOpaque(false);
		wellcomePanel.add(tipText, BorderLayout.CENTER);
		tipText.setText("hello!");
		
		Box writeBox = Box.createVerticalBox();
		Box receiveLineBox = Box.createHorizontalBox();
		Box titleLineBox = Box.createHorizontalBox();
		Box detailLineBox = Box.createHorizontalBox();
		Box sendLineBox = Box.createHorizontalBox();
		
		Dimension centerTop = new Dimension(450,20);
		Dimension centerMiddle = new Dimension(450,20);
		Dimension centerBottom = new Dimension(450,20);
		Dimension centerLeft = new Dimension(0,30);
		Dimension centerText = new Dimension(10,30);
		Dimension centerRight = new Dimension(10,30);
		
		writePanel.add(writeBox);
		writeBox.add(Box.createRigidArea(centerTop));
		writeBox.add(receiveLineBox);
		writeBox.add(Box.createRigidArea(centerMiddle));
		writeBox.add(titleLineBox);
		writeBox.add(Box.createRigidArea(centerMiddle));
		writeBox.add(detailLineBox);
		writeBox.add(Box.createRigidArea(centerMiddle));
		writeBox.add(sendLineBox);
		writeBox.add(Box.createRigidArea(centerBottom));
		
		JLabel receiveJLabel = new JLabel("收件人 : ");
		receiverJText = new JTextField();
		receiveLineBox.add(Box.createRigidArea(centerLeft));
		receiveLineBox.add(receiveJLabel);
		receiveLineBox.add(Box.createRigidArea(centerText));
		receiveLineBox.add(receiverJText);
		receiveLineBox.add(Box.createRigidArea(centerRight));
		
		JLabel titleJLabel = new JLabel("主  题 : ");
		titleJText = new JTextField();
		titleLineBox.add(Box.createRigidArea(centerLeft));
		titleLineBox.add(titleJLabel);
		titleLineBox.add(Box.createRigidArea(centerText));
		titleLineBox.add(titleJText);
		titleLineBox.add(Box.createRigidArea(centerRight));
		
		JLabel detailJLabel = new JLabel("正  文 : ");
		detailsJText = new JTextArea(12,27);
		detailsJText.setLineWrap(true);
		detailLineBox.add(Box.createRigidArea(centerLeft));
		detailLineBox.add(detailJLabel);
		detailLineBox.add(Box.createRigidArea(centerText));
		detailLineBox.add(new JScrollPane(detailsJText));
		detailLineBox.add(Box.createRigidArea(centerRight));
		
		JButton sendButton = new JButton("发    送");
		sendLineBox.add(Box.createRigidArea(centerLeft));
		sendLineBox.add(sendButton);
		sendLineBox.add(Box.createRigidArea(centerRight));
		sendButton.addActionListener(this);
		
		
		this.pack();
		this.setVisible(true);
		
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we){
				Msgcmn.logout(Msgcmn.EXIT);
				System.exit(0);
			}
		});
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if(e.getActionCommand().equals("写    信")){
			cardLayout.show(CenterPanel, "write");
		}else if(e.getActionCommand().equals("发    送")){
			setTipText("正在发送...");
			
			Msgcmn.send(receiverJText.getText(), titleJText.getText(), detailsJText.getText());
			
			cardLayout.show(CenterPanel, "welcome");
			
			receiverJText.setText(null);
			titleJText.setText(null);
			detailsJText.setText(null);
		}else if(e.getActionCommand().equals("退    出")){
			this.setVisible(false);
			Msgcmn.logout(Msgcmn.SHOW_LOGIN);
		}else if(e.getActionCommand().equals("收件箱") || e.getActionCommand().equals("发件箱")){
			setTipText("暂无" + e.getActionCommand() + "功能。。");
			cardLayout.show(CenterPanel, "welcome");
		}
	}
	
	public void setTipText(String text){
		tipText.setText(text);
	}
}
