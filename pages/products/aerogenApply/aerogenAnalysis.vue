<template>
	<view class="content">
		<view class="h3_title u-font-36 u-m-b-72">经营综合报告</view>
		<view class="an_hd_pic u-m-b-42">
			<u-image width="370" height="420" src="http://img.youyao99.com/19E1700D56BE9F2BE9D59B69B91E0E4B.png"></u-image>
		</view>
		<view class="an_detail u-p-l-30 u-p-r-30">
			<SpecialList :special_list="special_list" :styles="styles"></SpecialList>
		</view>
		<!-- 分析 -->
		<u-collapse 
		:head-style="{
			padding:'30rpx 10rpx 30rpx 30rpx',
			fontSize:'28rpx',
			borderTop:'1rpx solid #D9D9D9'
			}" 
		arrow-color="#C8C8CD"
		:body-style="{height:'auto'}"
		>
			<u-collapse-item title="AerogenⓇ 技术与SVN对比" >
				<view class="light_item u-p-t-40 u-p-b-40 u-p-l-16 u-p-r-16">
					<view class="h3_title u-font-36 u-m-b-52">AerogenⓇ 技术与SVN对比</view>
					<view class="u-flex u-row-around u-m-b-20">
						<u-image width="300" height="216" src="http://img.youyao99.com/916846CA1A45C59D8A610B3837D63173.png"></u-image>
						<u-image width="300" height="216" src="http://img.youyao99.com/05E801A490E2B00F859CE5A3161434D5.png"></u-image>
					</view>
					<view class="u-flex u-row-around u-m-b-20">
						<view class="u-flex-1 title_left">AerogenⓇ</view>
						<view class="circle u-m-r-40 u-m-l-40">VS</view>
						<view class="u-flex-1">SVN</view>
					</view>
					<view class="contrast u-flex u-row-around u-m-b-14 u-font-sm" v-for="(item,index) in svn_list" :key="index">
						<u-parse class="left_con u-flex-1" :html="item.left_con"></u-parse>
						<view class="mid_con u-m-l-14 u-m-r-14">{{item.mid_con}}</view>
						<u-parse class="u-flex-1" :html="item.right_con"></u-parse>
					</view>
					<view class="art_list u-font-xs">
						<view class="" v-for="(item,index) in svn_art_list" :key="item.id">
							{{item.art}}
						</view>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ 技术与USN对比" >
				<view class="light_item light_item_2 u-p-t-40 u-p-b-40 u-p-l-16 u-p-r-16">
					<view class="h3_title u-font-36 u-m-b-52">AerogenⓇ 技术与USN对比</view>
					<view class="u-flex u-row-around u-m-b-20">
						<u-image width="300" height="216" src="http://img.youyao99.com/916846CA1A45C59D8A610B3837D63173.png"></u-image>
						<u-image width="300" height="216" src="http://img.youyao99.com/4D8069BAEA4E7D874915E97CACD99F0C.png"></u-image>
					</view>
					<view class="u-flex u-row-around u-m-b-20">
						<view class="u-flex-1 title_left">AerogenⓇ</view>
						<view class="circle u-m-r-40 u-m-l-40">VS</view>
						<view class="u-flex-1">USN</view>
					</view>
					<view class="contrast u-flex u-row-around u-m-b-14 u-font-sm" v-for="(item,index) in usn_list" :key="index">
						<u-parse class="left_con u-flex-1" :html="item.left_con"></u-parse>
						<view class="mid_con u-m-l-14 u-m-r-14">{{item.mid_con}}</view>
						<u-parse class="u-flex-1" :html="item.right_con"></u-parse>
					</view>
					<view class="art_list u-font-xs">
						<view class="" v-for="(item,index) in usn_art_list" :key="item.id">
							{{item.art}}
						</view>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ 技术与MDI对比" >
				<view class="light_item u-p-t-40 u-p-b-40 u-p-l-16 u-p-r-16">
					<view class="h3_title u-font-36 u-m-b-52">AerogenⓇ 技术与MDI对比</view>
					<view class="u-flex u-row-around u-m-b-20">
						<u-image width="300" height="216" src="http://img.youyao99.com/916846CA1A45C59D8A610B3837D63173.png"></u-image>
						<u-image width="300" height="216" src="http://img.youyao99.com/28BCF63577341C0D0A4D23186935501C.png"></u-image>
					</view>
					<view class="u-flex u-row-around u-m-b-20">
						<view class="u-flex-1 title_left">AerogenⓇ</view>
						<view class="circle u-m-r-40 u-m-l-40">VS</view>
						<view class="u-flex-1">MDI</view>
					</view>
					<view class="contrast u-flex u-row-around u-m-b-14 u-font-sm" v-for="(item,index) in mdi_list" :key="index">
						<u-parse class="left_con u-flex-1" :html="item.left_con"></u-parse>
						<view class="mid_con u-m-l-14 u-m-r-14">{{item.mid_con}}</view>
						<u-parse class="u-flex-1" :html="item.right_con"></u-parse>
					</view>
					<view class="art_list u-font-xs">
						<view class="" v-for="(item,index) in mdi_art_list" :key="item.id">
							{{item.art}}
						</view>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ 技术完全静音" >
				<view class="dark_item u-p-t-60 u-p-b-52 u-p-l-40 u-p-r-40">
					<view class="u-text-center">
						<text class="h4_title" :style="{'borderRadius': '34rpx'}">AerogenⓇ 技术完全静音</text>
					</view>
					<view class="u-m-t-28 u-m-b-40">
						气溶胶设备和呼吸机警报的噪音是医院内两个主要的噪音来源，这将会影响患者的睡眠<sup>1</sup>
					</view>
					<view class="dark_item_con">
						<view class="u-flex u-col-top">
							<u-line class="u-m-r-14 u-m-t-6" color="#FDDB01" direction="col" length="28" :hair-line="false"/>
						 	SVN需要连接空气压缩机或是墙上的气体出口，这两种设备噪音都很大<sup>2</sup>
						</view>
						<view class="u-m-t-8">
							<text class="custom-icon u-m-r-12">&#xe609;</text>这使得治疗过程更舒适<sup>2</sup>
						</view>
						<view class="">
							<text class="custom-icon u-m-r-12">&#xe609;</text>孩子哭闹引发的问题<sup>3</sup>
						</view>
						<view class="u-flex u-col-top u-m-t-32">
							<u-line class="u-m-r-14 u-m-t-6" color="#FDDB01" direction="col" length="28" :hair-line="false"/>
						 	USN不连接空气压缩机；因此它的噪音比SVN<sup>2,4</sup>小
						</view>
						
					</view>
					<view class="u-m-t-70 u-m-b-50 u-m-l-28 u-m-r-28">
						<Describe :content="four_style"></Describe>
					</view>
					<view class="art_list u-font-xs u-p-t-12 u-p-b-12 u-p-l-26 u-p-r-26">
						<view class="" v-for="(item,index) in four_art_list" :key="item.id">
							{{item.art}}
						</view>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ 可以轻松地整合加药不会打破原有循环" >
				<view class="light_item_2 five_item u-p-t-60 u-p-b-52 u-p-l-40 u-p-r-40">
					<view class="u-text-center">
						<view class="h4_title" :style="{'borderRadius': '48rpx'}">AerogenⓇ 可以轻松地整合<br />加药不会打破原有循环</view>
					</view>
					<view class="u-m-t-40 u-m-b-64">
						<u-image :style="{'margin': '0 auto'}" width="420" height="420" src="http://img.youyao99.com/FAA4065978C84AF8BB7A07ABEC486DBC.png"></u-image>
					</view>
					<view class="dark_item_con">
						<view class="u-flex u-col-top">
							<u-line class="u-m-r-14 u-m-t-6" color="#FDDB01" direction="col" length="28" :hair-line="false"/>
						 	AerogenⓇ 气溶胶给药设备药物潴留将网格从循环中分离出来<sup>1,2</sup>
						</view>
						<view class="u-m-t-8">
							<text class="custom-icon u-m-r-12">&#xe609;</text>加药不需要打破通气<sup>2</sup>
						</view>
						
						<view class="u-flex u-col-top u-m-t-32" :style="{'color': '#333333'}">
							<u-line class="u-m-r-14 u-m-t-6" direction="col" length="28" :hair-line="false"/>
						 	加药时，替换或是重启SVN都需要打破循环<sup>2,3</sup>小
						</view>
						<view class="u-flex u-col-top u-m-t-10" :style="{'color': '#666666'}">
							<text class="custom-icon u-m-r-12">&#xe609;</text>
							<view class="">
								通气破损会导致患者肺塌陷，肺体积恢复需要一个小时后以上的时间<sup>3</sup>
							</view>
						</view>
					</view>
					<view class="u-m-t-70 u-m-b-50 u-m-l-28 u-m-r-28">
						<Describe :content="five_style"></Describe>
					</view>
					<view class="art_list u-font-xs u-p-t-12 u-p-b-12 u-p-l-26 u-p-r-26">
						<view class="" v-for="(item,index) in five_art_list" :key="item.id">
							{{item.art}}
						</view>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ技术适用于 所有可以气溶胶给药的药物" >
				<view class="dark_item six_item u-p-t-60">
					<view class="u-text-center">
						<view class="h4_title" :style="{'borderRadius': '48rpx'}">AerogenⓇ技术适用于<br/>所有可以气溶胶给药的药物</view>
					</view>
					<view class="u-m-t-28 u-m-b-40 u-text-center">
						气溶胶给药会改变药物溶液的温度这会引起温度敏感药物的降解，如蛋白和肽<sup>1</sup>
					</view>
					<view class="u-flex u-p-46">
						<u-image 
						class="u-m-l-40 u-m-r-70" 
						width="180" 
						height="400" 
						mode="heightFix"
						src="http://img.youyao99.com/91A089D4E740D38E9A1792603B5FB7B4.png"></u-image>
						<view class="">
							SVN会导致液滴温度高达13.5°C低于环境温度<sup>2</sup>
						</view>
					</view>
					<view class="u-flex u-p-46 u-row-between" :style="{backgroundColor:'#067DCE'}">
						<view class="u-text-right">
							USN会使药物温度增加到20°C<sup>2</sup>
						</view>
						<u-image 
						class="u-m-l-70 u-m-r-40" 
						width="180" 
						height="400" 
						mode="heightFix"
						src="http://img.youyao99.com/0D2D17B505145B3A554A2BDEA642A123.png"></u-image>
					</view>
					<view class="u-flex u-p-46">
						<u-image 
						class="u-m-l-40 u-m-r-70" 
						width="180" 
						height="400" 
						mode="heightFix"
						src="http://img.youyao99.com/6DB23823D868A0C4924B020BC2BB8CF0.png"></u-image>
						<view class="">
							VMN与AerogenⓇ相似，相对于SVN和USN相比引起药物温度改变很低<sup>1</sup>
						</view>
					</view>
					<view class="u-p-t-56 u-p-l-40 u-p-r-40 u-p-b-50" :style="{backgroundColor:'#067DCE'}">
						<view class="u-m-t-20 u-m-b-50 u-m-l-28 u-m-r-28">
							<Describe :content="four_style"></Describe>
						</view>
						<view class="art_list u-font-xs u-p-t-12 u-p-b-12 u-p-l-26 u-p-r-26" :style="{backgroundColor:'#0077C8'}">
							<view class="" v-for="(item,index) in six_art_list" :key="item.id">
								{{item.art}}
							</view>
						</view>	
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ 技术给药量更大" >
				<view class="light_item_2 seven_item u-p-t-60 u-p-b-52 u-p-l-40 u-p-r-40">
					<view class="u-text-center">
						<view class="h4_title" :style="{'borderRadius': '48rpx'}">AerogenⓇ 技术给药量更大</view>
					</view>
					<view class="u-m-t-40 u-m-b-64 u-text-center" :style="{'color':'#0077C8'}">
						AerogenⓇ 气溶胶药物给药设备在临床研<br/>究中表现比SVN和USN都好<sup>1,2</sup>
					</view>
					<view class="" :style="{'border':'2rpx solid #0077C8'}">
						<view class="u-p-20 u-text-center" :style="{'backgroundColor':'#0077C8','color':'#FFFFFF'}">
							在儿科机械通气模型中将AerogenⓇ 置于加湿器前，其 相对于SVN和USN给药量更多
						</view>
						<view class="u-m-t-30 u-m-b-30">
							<u-image
							:style="{'margin':'0 auto'}"
							width="600" 
							height="320" 
							mode="heightFix" src="http://img.youyao99.com/0CD555F0D091E2E0E1A28D67B740017B.png"></u-image>
						</view>
					</view>
					<view class="u-m-t-60" :style="{'border':'2rpx solid #0077C8'}">
						<view class="u-p-20 u-text-center" :style="{'backgroundColor':'#0077C8','color':'#FFFFFF'}">
							在健康受试者体内，AerogenⓇ Ultra的肺沉积比SVN给小多四倍<sup>2</sup>
						</view>
						<view class="u-m-t-30 u-m-b-30">
							<u-image
							:style="{'margin':'0 auto'}"
							width="600" 
							height="320" 
							mode="heightFix" src="http://img.youyao99.com/F5AC6AD863FD50D550D65E5DFFF1E7C5.png"></u-image>
						</view>
					</view>
					<view class="u-m-t-70 u-m-b-50 u-m-l-28 u-m-r-28">
						<Describe :content="seven_style"></Describe>
					</view>
					<view class="art_list u-font-xs u-p-t-12 u-p-b-12 u-p-l-26 u-p-r-26">
						<view class="" v-for="(item,index) in seven_art_list" :key="item.id">
							{{item.art}}
						</view>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ Ultra 在一半的时间里给药量都更大" >
				<view class="dark_item seven_item u-p-t-60 u-p-b-52 u-p-l-40 u-p-r-40">
					<view class="u-text-center">
						<view class="h4_title" :style="{'borderRadius': '48rpx'}">AerogenⓇ Ultra 在一半的时间里给药量都更大</view>
					</view>
					<view class="u-m-t-40 u-m-b-64 u-text-center" :style="{'color':'#FDDB01'}">
						在COPD模型中，AerogenⓇ Ultra 运输到<br />肺的药物是SVN的八倍<sup>1</sup>
					</view>
					<view class="" :style="{'border':'2rpx solid #FFFFFF','backgroundColor':'#FFFFFF'}">
						<view class="u-p-20 u-text-center" :style="{'backgroundColor':'#0077C8','color':'#FFFFFF'}">
							在健康成人和COPD患者的模拟自主呼吸模型中，AerogenⓇ Ultra体外每分钟运送药物的量比SVN显著增多
						</view>
						<view class="u-m-t-30 u-m-b-30">
							<u-image
							:style="{'margin':'0 auto'}"
							width="600" 
							height="380" 
							mode="heightFix" src="http://img.youyao99.com/21355A7EA105D5145E6524FB2487DAB7.png"></u-image>
						</view>
					</view>
					<view class="u-m-t-60" :style="{'border':'2rpx solid #FFFFFF','backgroundColor':'#FFFFFF'}">
						<view class="u-p-20 u-text-center" :style="{'backgroundColor':'#0077C8','color':'#FFFFFF'}">
							健康成人和COPD患者在体外aAerogenⓇ Ultra 运送标准剂量的沙丁胺醇比SVN快
						</view>
						<view class="u-m-t-30 u-m-b-30">
							<u-image
							:style="{'margin':'0 auto'}"
							width="600" 
							height="380" 
							mode="heightFix" src="http://img.youyao99.com/6F4B365F124DABBBBD3A0689BBB937DE.png"></u-image>
						</view>
					</view>
					<view class="u-m-t-70 u-m-b-50 u-m-l-28 u-m-r-28">
						<Describe :content="eight_style"></Describe>
					</view>
					<view class="art_list u-font-xs u-p-t-12 u-p-b-12 u-p-l-26 u-p-r-26">
						<view class="" v-for="(item,index) in eight_art_list" :key="item.id">
							{{item.art}}
						</view>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ 技术使治疗有了更快的反应" >
				<view class="light_item_2 nine_item u-p-t-60 u-p-b-52 u-p-l-40 u-p-r-40">
					<view class="u-text-center">
						<view class="h4_title" :style="{'borderRadius': '48rpx','width':'auto'}">AerogenⓇ 技术使治疗有了更快的反应</view>
					</view>
					<view class="dark_item_con u-m-t-30">
						<view class="u-flex u-col-top" :style="{'color': '#333333'}">
							<u-line class="u-m-r-14 u-m-t-6" color="#0077C8" direction="col" length="28" :hair-line="false"/>
						 	呼吸科工作人员大部分时间是花在将气溶胶药物递送给病人
						</view>
						<view class="u-flex u-col-top u-m-t-8">
							<text class="custom-icon u-m-r-12">&#xe609;</text>
							<view class="">
								影响给药的因素包括气溶胶给药设备类型、残留体积、设备使用的认知能力和物理能力、治疗中的哭闹和干扰
							</view>
							<sup>2</sup>
						</view>
					</view>
					<view class="u-rela u-m-t-60 case_item">
						<u-image 
						width="600" 
						height="430" 
						mode="heightFix" 
						src="http://img.youyao99.com/D72783F3A3DDF2A9594FB7C4861FA214.png"
						:style="{'margin':'0 auto'}">
						</u-image>
						<view class="u-abso case_hd">
							<view class="u-text-center u-m-t-36 u-m-b-8" :style="{'fontWeight':'bold'}">案例研究</view>
							<view class="">在儿科急救室(ER)配备AerogenⓇ Solo 是革新计划的一部分</view>
						</view>
						<view class="u-abso case_bd">
							<view class="">肠病毒D68感染病人ER护理后取得突破后的评估</view>
							<view class="u-flex u-col-top u-m-t-12">
								<text class="custom-icon u-m-r-12">&#xe609;</text>
								<view class="" :style="{'color':'#333333'}">治疗时间从预期的SVN5小时，到AerogenⓇ Solo用了2.5小时</view>
							</view>
						</view>
					</view>
					<view class="u-m-t-70 u-m-l-28 u-m-r-28">
						<Describe :content="nine_style"></Describe>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ Ultra 技术在循环上" >
				<view class="dark_item seven_item u-p-t-60 u-p-b-52 u-p-l-40 u-p-r-40">
					<view class="u-text-center u-m-b-80">
						<view class="h4_title" :style="{'borderRadius': '48rpx','width':'480rpx'}">AerogenⓇ Ultra 技术在循环上</view>
					</view>
					<view class="u-m-b-60">
						<u-image :style="{'margin':'0 auto'}" width="540" height="400" mode="heightFix" src="http://img.youyao99.com/4747125EBE95F7EB3203D7DAA4EC50CF.png"></u-image>
					</view>
					<view class="u-m-b-60">
						<u-image :style="{'margin':'0 auto'}" width="540" height="400" mode="heightFix" src="http://img.youyao99.com/4493D5E0A9BBA81509752AA0BAEB751D.png"></u-image>
					</view>
					<view class="u-m-b-60">
						<u-image :style="{'margin':'0 auto'}" width="540" height="400" mode="heightFix" src="http://img.youyao99.com/0DD81266A8152A9311E3755B3AB36039.png"></u-image>
					</view>
					<view class="dark_item_con u-m-l-20 u-m-r-20">
						<view class="u-flex u-col-top u-m-b-8">
							<u-line class="u-m-r-14 u-m-t-6" color="#FDDB01" direction="col" length="28" :hair-line="false"/>
						 	AerogenⓇ 气溶胶给药设备的药物池在循环外，与呼吸机管道是分离的，降低了污染的风险<sup>1,2</sup>
						</view>
						<view class="u-flex u-col-top u-m-t-8">
							<text class="custom-icon u-m-r-12">&#xe609;</text>
							<view class="">
								SVN和USN的药物池一般位于循环中，对循环是开放的，增加了污染的风险<sup>1,2</sup>
							</view>
							
						</view>
					</view>
					<view class="u-m-t-70 u-m-b-50 u-m-l-28 u-m-r-28">
						<Describe :content="ten_style"></Describe>
					</view>
					<view class="art_list u-font-xs u-p-t-12 u-p-b-12 u-p-l-26 u-p-r-26">
						<view class="" v-for="(item,index) in ten_art_list" :key="item.id">
							{{item.art}}
						</view>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ 技术得到了医护工作者和患者满意" >
				<view class="light_item_2 seven_item u-p-t-60 u-p-b-52 u-p-l-40 u-p-r-40">
					<view class="u-text-center">
						<view class="h4_title" :style="{'borderRadius': '48rpx'}">AerogenⓇ 技术得到了医护工作者和患者满意</view>
					</view>
					<view class="u-m-t-40 u-m-b-64 u-text-center" :style="{'color':'#0077C8'}">
						在儿科急救室配备AerogenⓇ Solo<br />代替传统的SVN
					</view>
					<view class="u-rela">
						<u-image :style="{'margin': '0 auto'}" width="600" height="560" mode="heightFix" src="http://img.youyao99.com/309A37C284DDB335AE5541DB55EC1CCD.png"></u-image>
						<view class="u-abso eleven_case">
							呼吸疾病医护工作人员建议： <br />
							呼吸系统疾病的患儿应采用气溶胶疗法，<br />
							用AerogenⓇ Solo 代替SVN。
						</view>
					</view>
					<view class="u-m-t-70 u-m-l-28 u-m-r-28">
						<Describe :content="eleven_style"></Describe>
					</view>
				</view>
			</u-collapse-item>
			<u-collapse-item title="AerogenⓇ 技术减少药物浪费" >
				<view class="dark_item seven_item u-p-t-60 u-p-b-52 u-p-l-40 u-p-r-40">
					<view class="u-text-center u-m-b-80">
						<view class="h4_title" :style="{'borderRadius': '48rpx','width':'480rpx'}">AerogenⓇ 技术减少药物浪费</view>
					</view>
					<view class="u-m-b-64 u-text-center" :style="{'color':'#FDDB01'}">
						在药物残留体积方面相对于SVN和USN,<br /> AerogenⓇ 气溶胶给药设备减少了浪费
					</view>
					<view class="u-m-b-60">
						<u-image :style="{'margin':'0 auto'}" width="640" height="450" mode="heightFix" src="http://img.youyao99.com/246C1375D83593027311F21FA63AFE6F.png"></u-image>
					</view>
					<view class="dark_item_con u-m-l-20 u-m-r-20">
						<view class="u-flex u-col-top u-m-b-40">
							<u-line class="u-m-r-14 u-m-t-6" color="#FDDB01" direction="col" length="28" :hair-line="false"/>
						 	AerogenⓇ 设备治疗过程中不改变药物池中的浓度。
						</view>
						<view class="u-flex u-col-top u-m-b-8">
							<u-line class="u-m-r-14 u-m-t-6" color="#FDDB01" direction="col" length="28" :hair-line="false"/>
						 	由于治疗中的蒸发作用，SVN和USN池中的药物溶液浓度增加
						</view>
						<view class="u-flex u-col-top u-m-t-8">
							<text class="custom-icon u-m-r-12">&#xe609;</text>
							<view class="">
								由于治疗中的蒸发作用，SVN和USN池中的药物溶液浓度增加
							</view>
						</view>
					</view>
					<view class="u-m-t-70 u-m-b-50 u-m-l-28 u-m-r-28">
						<Describe :content="tw_style"></Describe>
					</view>
					<view class="art_list u-font-xs u-p-t-12 u-p-b-12 u-p-l-26 u-p-r-26">
						<view class="" v-for="(item,index) in tw_art_list" :key="item.id">
							{{item.art}}
						</view>
					</view>
				</view>
			</u-collapse-item>
		</u-collapse>
		<view class="fix_bt_btn u-p-30">
			<u-button 
			type="primary" 
			shape="circle" 
			hover-class="none"  
			:custom-style="{backgroundColor:'#0077C8'}"
			@click="toNextPage('/pages/webview/aerogenSurvey')">成为经销商</u-button>
		</view>
	</view>
</template>
<script>
	import Describe from '@/components/products/Describe.vue';
	import SpecialList from '@/components/products/SpecialList.vue';
	export default{
		data(){
			return{
				special_list:[
					{
						title:'AerogenⓇ 气溶胶给药设备全静音运行'
					},
					{
						title:'AerogenⓇ 技术使用简便，与SVN一样容易携带',
					},
					{
						title:'与竞争对手相比，AerogenⓇ技术降低了浪费，经济效益更高'
					},
					{
						title:'与SVN和USV不同，加药时AerogenⓇ技术不会打破循环'
					},
					{
						title:'AerogenⓇ到肺部的药比SVN更多'
					},
					{
						title:'AerogenⓇ 气溶胶给药设备比竞争对手的设备适用于更多类型的药物'
					},
				],
				styles:{
					width:'40rpx',
					height:'40rpx',
					backgroundColor:'#0077C8',
					indexColor:'#0077C8',
					color:'#333333',
					fontColor:'#FFFFFF',
					textAlign:'center'
				},
				svn_list:[
					{
						left_con:'与SVN相比给药量多了3-4倍<sup>1</sup>',
						mid_con:'给药量',
						right_con:'比AerogenⓇ Solo给药量小<sup>1</sup>'
					},
					{
						left_con:'药物残留体积<0.1 ml<sup>2</sup>',
						mid_con:'药物残留',
						right_con:'药物残留体积0.8-1.4 ml<sup>3</sup>'
					},
					{
						left_con:'轻松加药，不打破循环剂量<sup>4</sup>',
						mid_con:'加药',
						right_con:'加药需要打破循环<sup>4,5</sup>'
					},
					{
						left_con:'循环上的药物潴留点<sup>3,5,6</sup>',
						mid_con:'潴留点',
						right_con:'药物潴留点对循环开放<sup>3,5,6</sup>'
					},
					{
						left_con:'不增加流量<sup>2</sup>',
						mid_con:'流量',
						right_con:'增加流量，需要调整呼吸机<sup>5,6</sup> 设置和报警'
					},
					{
						left_con:'静音运行<sup>2</sup>',
						mid_con:'音量',
						right_con:'噪音<sup>7</sup>'
					},
				],
				svn_art_list:[
					{
						id:1,
						art:'1.Ari et al. Respir Care 2010;',
					},
					{
						id:2,
						art:'2. AerogenⓇ. AerogenⓇ Solo Product Sheet; ',
					},
					{
						id:3,
						art:'3. Ari et al. J Aerosol Med Pulm Drug Deliv 2012; ',
					},
					{
						id:4,
						art:'4. Ari Clinical Foundations 2012; ',
					},
					{
						id:5,
						art:`5. Cairo Mosby's Respiratory Care Equipment 2013;`,
					},
					{
						id:6,
						art:'6. Ari & Fink Clin Pulm Med 2015;',
					},
					{
						id:7,
						art:'7. Clinical Guard. 2014;',
					},
				],
				usn_list:[
				  {
					left_con:'适用于溶液、悬浊液、蛋白和肽<sup>1,2</sup>',
					mid_con:'适用',
					right_con:'不适用于悬浊液、蛋白和肽<sup>2</sup>'
				  },
				  {
					left_con:'药物残留体积<0.1 ml<sup>1</sup>',
					mid_con:'药物残留',
					right_con:'药物残留体积0.5-1.0 ml<sup>2</sup>'
				  },
				  {
					left_con:'产生的热很少<sup>3,4</sup>',
					mid_con:'产热',
					right_con:'与其他装备比产热多<sup>3,4</sup>'
				  },
				  {
					left_con:'循环上的药物潴留点<sup>5</sup>',
					mid_con:'潴留点',
					right_con:'药物潴留点对循环开放<sup>5</sup>'
				  },
				],
				usn_art_list:[
					{
						id:1,
						art:'1. AerogenⓇ. AerogenⓇ Solo 产品单;',
					},
					{
						id:2,
						art:'2. Ari & Fink Clin Pulm Med 2015; ',
					},
					{
						id:3,
						art:'3. Sidler-Moix et al. Respir Care 2015;',
					},
					{
						id:4,
						art:'4. Carvalho & McConville. J Pharm Pharmacol 2016;',
					},
					{
						id:5,
						art:`5. Cairo Mosby's Respiratory Care Equipment 2013;`,
					},
				],
				mdi_list:[
					{
						left_con:'每次给药相对于MDI<sup>1</sup><br/> 给药量更大',
						mid_con:'给药量',
						right_con:'比AerogenⓇ Solo给药量低<sup>1</sup>'
					},
					{
						left_con:'适用于所有许可的雾化药物',
						mid_con:'适用范围',
						right_con:'可用药物范围有限<sup>2</sup>'
					},
					{
						left_con:`“即插即用”使用方便<sup>3-5</sup>`,
						mid_con:'使用方式',
						right_con:'依赖技术<sup>2</sup>'
					},
					{
						left_con:'自由装药操作<sup>5</sup>',
						mid_con:'操作',
						right_con:'药物潴使用HFA推进剂<sup>5</sup>'
					},
				],
				mdi_art_list:[
					{
						id:1,
						art:'HFA, hydrofluoroalkane',
					},
					{
						id:2,
						art:'1. Alhamad et al. Respir Care 2015;',
					},
					{
						id:3,
						art:'2. Sims. Chest 2011;',
					},
					{
						id:4,
						art:'3. AerogenⓇ. AerogenⓇ Solo产品单;',
					},
					{
						id:5,
						art:`4. AerogenⓇ. AerogenⓇ USB控制器产品单;`,
					},
					{
						id:6,
						art:`5. Bonini & Usmani. COPD Research and Practice 2015;`,
					},
				],
				four_art_list:[
					{
						id:1,
						art:'1. Xie et al. Critical Care 2009;',
					},
					{
						id:2,
						art:'2. Clinical Guard 2014;',
					},
					{
						id:3,
						art:'3. Murakami et al. Ann Allergy 1990;',
					},
					{
						id:4,
						art:'4. Win Health Medical;',
					},
					{
						id:5,
						art:`5. AerogenⓇ. AerogenⓇ Solo 产品单;`,
					}
				],
				four_style:{
					bgc:"#FFFFFF",
					color:'#0077C8',
					content:'AerogenⓇ 气溶胶给药设备全静音运行',
					sup:'5'
				},
				five_style:{
					bgc:"#0077C8",
					color:'#FFFFFF',
					content:'AerogenⓇ Solo可以在循环中阶段性使用28天',
					sup:''
				},
				four_style:{
					bgc:"#FFFFFF",
					color:'#0077C8',
					content:'AerogenⓇ 气溶胶给药设备可以有效的将很多药物气溶胶化',
					sup:'1,2'
				},
				five_art_list:[
					{
						id:1,
						art:'1. Ari. Clinical Foundations 2012;',
					},
					{
						id:2,
						art:'2. AerogenⓇ. AerogenⓇ Solo产品单;',
					},
					{
						id:3,
						art:`3. Cairo Mosby's Respiratory Care Equipment 2013;`,
					},
					{
						id:4,
						art:'4. Ari Clinical Foundations 2012;',
					}
				],
				six_art_list:[
					{
						id:1,
						art:'1. Carvalho & McConville. J Pharm Pharmacol 2016;',
					},
					{
						id:2,
						art:'2. Sidler-Moix et al. Respir Care 2015;',
					}
				],
				seven_style:{
					bgc:"#0077C8",
					color:'#FFFFFF',
					content:'AerogenⓇ 气溶胶给药设备比SVN和USN运送到肺部的药物更多',
					sup:'1,2'
				},
				seven_art_list:[
					{
						id:1,
						art:'*p < 0.001 vs AerogenⓇ',
					},
					{
						id:2,
						art:'1. Berlinski & Willis. Respir Care 2013; ',
					},
					{
						id:3,
						art:'2. Alcoforado et al. Poster presentation at ISAM 2015;',
					}
				],
				eight_style:{
					bgc:"#FFFFFF",
					color:'#0077C8',
					content:'与SVN相比AerogenⓇ Ultra 在一半的时间里给药量明显更大',
					sup:'1,2'
				},
				eight_art_list:[
					{
						id:1,
						art:'COPD, Chronic Obstructive Pulmonary Disease 慢性阻塞性肺病',
					},
					{
						id:2,
						art:'1. Hickin et al. Poster at the College of Emergency Medicine Clinical Excellence Conference. 2014; ',
					},
					{
						id:3,
						art:'2. AerogenⓇ. AerogenⓇ Solo Product Sheet;',
					}
				],
				nine_style:{
					bgc:"#0077C8",
					color:'#FFFFFF',
					content:'根据医院的经验，儿科ER中使用AerogenⓇSolo改善了肠病毒D68感染患者的反应时间',
					sup:''
				},
				ten_style:{
					bgc:"#FFFFFF",
					color:'#0077C8',
					content:`相对于SVN和USN，AerogenⓇ Solo和AerogenⓇ Pro 药物残留体积最小`,
					sup:'1-2'
				},
				ten_art_list:[
					{
						id:1,
						art:`图片的复制得到了 Muchão, Filho. J Pediatr (Rio J) 2010 和 Kleinstreuer et al. World J Clin Cases 2014 的授权`,
					},
					{
						id:2,
						art:`1. Cairo Mosby's Respiratory Care Equipment 2013;`,
					},
					{
						id:3,
						art:'2. Kleinstreuer et al. World J Clin Cases 2014;',
					},
					{
						id:4,
						art:'3. Ari et al. J Aerosol Med Pulm Drug Deliv 2012;',
					}
				],
				eleven_style:{
					bgc:"#0077C8",
					color:'#FFFFFF',
					content:` 使用 AerogenⓇ Solo反应的描述如下 “临床医生、患者和父母都给予了积极的评价”`,
					sup:''
				},
				tw_art_list:[
					{
						id:1,
						art:`*p < 0.001 相对于其他设备`,
					},
				],
				tw_style:{
					bgc:"#FFFFFF",
					color:'#0077C8',
					content:`相对于SVN和USN ，AerogenⓇ Solo和 AerogenⓇ Pro 药物残留体积最小`,
					sup:''
				},
			}
		},
		components:{
			SpecialList,
			Describe
		},
		methods:{
			toNextPage(url){
				this.$Router.push({
					path:url
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		padding-bottom: 160rpx;
	}
	.h3_title{
		position: relative;
		text-align: center;
		color: $color-41;
		font-weight: bold;
		&::after{
			content: '';
			position: absolute;
			bottom: -10rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 36rpx;
			height: 6rpx;
			background-color: $color-41;
		}
	}
	.an_hd_pic{
		text-align: center;
		.u-image{
			margin: 0 auto;	
		}
	}
	.light_item{
		background-color: $color-44;
		.title_left{
			color: $color-41;
			text-align: right;
		}
		.circle{
			width: 60rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 50%;
			color: $color-41;
			background-color: $color-43;
		}
		.contrast{
			font-size: 24rpx;
			.left_con{
				color: $color-41;
				text-align: right;
			}
			.mid_con{
				width: 110rpx;
				font-size: 20rpx;
				line-height: 40rpx;
				color: $color-41;
				background-color: $color-43;
				text-align: center;
				border-radius: 24rpx;
			}
		}
		.art_list{
			line-height: 36rpx;
			font-size: 20rpx;
			color: $color-x6;
			background-color: $color-xf;
			padding: 12rpx 26rpx;
			margin: 60rpx 24rpx 0rpx 24rpx;
		}
	}
	.light_item_2{
		background-color: $color-xf;
		.art_list{
			background-color: $color-f5;
		}
	}
	.dark_item{
		background-color: $color-41;
		.u-m-t-28{
			margin: 0 60rpx;
			color: #FDDB01;
		}
		.dark_item_con{
			color: $color-xf;
			.u-line{
				border-left: 6rpx solid #FEDD00 !important;
			}
		}
		.art_list{
			color: $color-xf;
			background-color: $color-42;
		}
	}
	.h4_title{
		width: 408rpx;
		font-weight: bold;
		color: $color-41;
		background-color: #FEDD00;
		line-height: 40rpx;
		text-align: center;
		padding: 10rpx 14rpx;
		margin: 0 auto;
	}
	.five_item{
		.dark_item_con{
			color: $color-41;
			.u-line{
				border-left: 6rpx solid $color-41 !important;
			}
		}
		.art_list{
			color: $color-x6;
			background-color: $color-f5;
		}
	}
	.six_item{
		color: $color-xf;
	}
	.nine_item{
		.u-line{
			border-left: 6rpx solid $color-41 !important;
		}
		.case_item{
			color: $color-x6;
			.case_hd{
				top: 0;
				left: 100rpx;
				right: 100rpx;
				color: $color-41;
				// margin: 0 100rpz;
			}
			.case_bd{
				left: 100rpx;
				right: 100rpx;
				bottom: 60rpx;
			}
		}
	}
	.eleven_case{
		width: 100%;
		line-height: 48rpx;
		color: $color-xf;
		top: 45%;
		left: 50%;
		transform: translate(-50%,-40%);
		text-align: center;
	}
</style>
