﻿import component from "@/locales/en-US/component";
import path from "path";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/guess',
		name: 'Guess Game',
		component: './B23DCCC158-TH1/Gues/Guesgame',
		icon: 'Game',
	},
	{
		path: '/OTT',
		name:'OanTuTy',
		component:'./B23DCCC158-TH2/Bai1/GameOTT',
		icon: 'GameConsole'
	},
	{
		
		name: 'Quản lý đề thi',
		routes: [
					{
						name: 'Quản lý môn học',
						path: 'mon-hoc',
						component: './B23DCCC158-TH2/Exam/Subjects',
					},
					{
						name: 'Quản lý câu hỏi',
						path: 'quan-ly-cau-hoi',
						component: './B23DCCC158-TH2/Exam/Questions',
					},{
						name: 'Quản lý đề thi',
						path: 'muc-tieu-mon-hoc',
						component: './B23DCCC158-TH2/Exam/Exam',
					},
				],
		icon: 'MenuUnfoldOutlined',
	},
	
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/',
		name: 'StudyTracker',
		icon: 'HomeOutlined',
		routes: [
			{
				path: './QuanLyMonHoc',
				name: 'QuanLyMonHoc',
				component: './B23DCCC158-TH1/StudyTracker/QuanLyMonHoc',
				icon: 'HomeOutlined',
			},
			{
				path: './QuanLyTienDo',
				name: 'QuanLyTienDo',
				component: './B23DCCC158-TH1/StudyTracker/QuanLyTienDo',
				icon: 'HomeOutlined',
			},
			{
				path: './ThietLapMucTieu',
				name: 'ThietLapMucTieu',
				component: './B23DCCC158-TH1/StudyTracker/ThietLapMucTieu',
				icon: 'HomeOutlined',
			},
		],

	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
