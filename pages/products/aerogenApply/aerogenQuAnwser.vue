<template>
	<view class="content u-p-30">
		<template v-if="this.$Route.query.qu_type==='com_problem'">
			<view class="u-m-b-40" v-for="item in problem_list" :key="item.id">
				<view class="u-flex u-col-top u-m-b-12 u-font-32" :style="{'fontWeight':'bold','color':'#000000'}">
					<u-line 
					class="u-m-r-12" 
					color="#0077C8" 
					direction="col" 
					length="28" 
					:hair-line="false"
					:style="{'borderLeft':'6rpx solid #0077C8'}"></u-line>
					<u-parse :html="item.title"></u-parse>	
				</view>
				<u-parse class="u-m-l-24 u-m-r-24" :style="{'color':'#666666','lineHeight':'48rpx','textIndent':'2em'}" :html="item.content"></u-parse>
			</view>
		</template>
		<template v-if="this.$Route.query.qu_type==='solo_problem'">
			<view class="u-m-b-40" v-for="item in solo_list" :key="item.id">
				<view class="u-flex u-col-top u-m-b-12 u-font-32" :style="{'fontWeight':'bold','color':'#000000'}">
					<u-line 
					class="u-m-r-12" 
					color="#0077C8" 
					direction="col" 
					length="28" 
					:hair-line="false"
					:style="{'borderLeft':'6rpx solid #0077C8'}"></u-line>
					<u-parse :html="item.title"></u-parse>	
				</view>
				<u-parse class="u-m-l-24 u-m-r-24" :style="{'color':'#666666','lineHeight':'48rpx','textIndent':'2em'}" :html="item.content"></u-parse>
			</view>
		</template>
		<template v-if="this.$Route.query.qu_type==='ultra_problem'">
			<view class="u-m-b-40" v-for="item in ultra_list" :key="item.id">
				<view class="u-flex u-col-top u-m-b-12 u-font-32" :style="{'fontWeight':'bold','color':'#000000'}">
					<u-line 
					class="u-m-r-12" 
					color="#0077C8" 
					direction="col" 
					length="28" 
					:hair-line="false"
					:style="{'borderLeft':'6rpx solid #0077C8'}"></u-line>
					<u-parse :html="item.title"></u-parse>	
				</view>
				<u-parse class="u-m-l-24 u-m-r-24" :style="{'color':'#666666','lineHeight':'48rpx','textIndent':'2em'}" :html="item.content"></u-parse>
			</view>
		</template>
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
	export default{
		data(){
			return {
				problem_list:[
					{
						id:1,
						title:'1、AerogenSolo、Pro和Ultra可以使用哪些药剂？',
						content:`AerogenSolo、Pro和Ultra适用于由当地相关部门批准使用常规雾化器雾化吸入并由具备资质的医师处方的药物。有关特定药剂和剂量的更多信息，请联系我们的临床团队：msl@aerogen.com。`,
					},
					{
						id:2,
						title:'2、使用AerogenSolo/Pro时是否应该调整药剂的剂量？',
						content:`AerogenSolo/Pro可用于已批准使用常规雾化器雾化吸入并由医生处方的药物。AerogenLtd无法就药物剂量提供具体建议，因为目前还没有药物/设备组合的相关批准。必须从药物制造商出具的药品使用说明书中获取有关使用剂量和使用特定相关雾化器的信息。<p class="qa_con" style="margin-left:0;margin-right:0">如果您需要已发表的有使用Aerogen设备雾化特定药物的临床研究信息，请联系我们的临床团队：msl@aerogen.com。</p>`,
					},
					{
						id:3,
						title:'3、加湿会影响气溶胶药剂颗粒吗？',
						content:`许多实验模型研究表明使用pMDI、喷射雾化器、超声波和振动筛网雾化器时吸入干燥气体会增加药物的沉降率<sub class="font_10">1</sub>。但Lin等人(2009)的研究也表明，关闭湿化器30分钟药物的肺内沉降率不会增加<sub class="font_10">2</sub>。机械通气时常用药物为支气管扩张剂，而寒冷干燥的空气容易引起支气管痉挛，因此机械通气雾化时关闭湿化器可能会降低支气管扩张剂的疗效<sub class="font_10">3</sub>。最大的风险是，雾化治疗结束后忘记重新开启湿化器。`,
					},
					{
						id:4,
						title:'4、如果雾化导致湿化器中的水变色，药物会受到影响吗？',
						content:`有时候雾化后加湿器中的水颜色可能会发生变化，例如肾上腺素和异丙托溴铵/沙丁胺醇会使水变成褐色。但凝结在湿化器水里的药物不会再被雾化。Saeed等人(2017)模拟湿化罐内的环境研究了常用雾化药物在50°C连续7天后的化学稳定性，除乙酰半胱氨酸外，所有药物都保持其完整性，乙酰半胱氨酸在HPLC色谱图中有新的峰值<sub class="font_10">4</sub>。
						<p class="qa_con" style="margin-left:0;margin-right:0">如果医生仍然担心这种影响，可以建议将AerogenSolo放置于呼吸机回路Y型接头处。请参考不同位置沉降率的文章<sub class="font_10">1,5,6</sub>。</p>
						  `,
					},
					{
						id:5,
						title:'5、湿化器中加热的水是否会对药物成分有影响？',
						content:`Saeed等人(2017)模拟湿化罐内的环境研究了常用雾化药物在50°C连续7天后的，化学稳定性，除乙酰半胱氨酸外，所有药剂都保持其完整性，乙酰半胱氨酸在HPLC色谱图中有新的峰值<sub class="font_10">4</sub>。`,
					},
					{
						id:6,
						title:'6、如果在雾化杯中形成结晶体，我该怎么办？',
						content:`如果雾化高渗盐水后在雾化杯中出现结晶，您可以雾化几滴生理盐水以清除任何残留的高渗盐水，并防止更多结晶体的形成。`,
					},
					{
						id:7,
						title:'7、什么是冷凝水，这是雾化的药物吗？',
						content:`冷凝水通常是湿化器产生的水蒸气和小部分的雾化药物凝结在呼吸回路上形成。凝结后的药物不会被雾化，也不会被患者吸入。`,
					},
					{
						id:8,
						title:'8、雾化比较粘性的药物后，如何清除雾化杯中的残留药物？',
						content:`您可以雾化数滴生理盐水以去除残留在雾化杯中的粘性药物残留。`,
					},
					{
						id:9,
						title:'9、带偏流的呼吸机对雾化颗粒的输出和沉降有何影响？',
						content:`Ari等人(2010)的实验模型研究评估了在带偏流的机械通气中雾化吸入的效果，将AerogenSolo放置在呼吸机加湿器的干燥端时获得最佳沉降率。在不带偏流的机械通气中，将AerogenSolo放置在Y形接头或靠近Y形接头时观察到最佳沉降率1<sub class="font_10">5</sub>。Berlinski&Willis(2013)的儿科实验模型表明在带偏流的小儿机械通气中，AerogenSolo放置在湿化器端时比放置在Y形接头处沉降率更高<sub class="font_10">6</sub>。`,
					},
					{
						id:10,
						title:'10、Aerogen雾化器和超声雾化器比较，它们各有哪些优点/缺点呢？',
						content:`超声雾化器的主要缺点是雾化药物的过程中会产生热量从而使药物升温，
						  这会分解一些药物中的复合蛋白质<sub class="font_10">7</sub>，不能用于蛋白、肽类等含蛋白质的雾化药物。此外不建议使用超声雾化器(USN)雾化布地奈德等悬浮液。在没有偏流的机械通气模型中，它们在成人模式中放置在Y形接头和放置在湿化器端都有着相近的药物沉降率<sub class="font_10">1</sub>。在带偏流的机械通气儿童模式中，AerogenSolo放置湿化器端的表现比超声雾化器更好，在Y形接头时有相近的沉降率<sub class="font_10">6</sub>。超声雾化器的控制器相对于Aerogen的控制器更大、更笨重。超声雾化器不能将药杯中的药物完全雾化，雾化后的残余药量比与Aerogen的更多<sub class="font_10">7</sub>。超声雾化器在呼吸回路中处于低处，雾杯中容易流入冷凝水或回路中受污染的液体<sub class="font_10">7</sub>。`,
					},
					{
						id:11,
						title:'11、您能否使用AerogenSolo为HFNC的儿童患者雾化吸入有效的药物剂量？',
						content:`多项实验模型研究评估了给HFNC患者进行雾化吸入沙丁胺醇的效果。Reminiac等人(2017)发表了一篇在儿童的实验模型和新生儿的动物模型中研究HFNC患者的雾化吸入沉降率的文章<sub class="font_10">8</sub>。这篇文章表述了在HFNC患者中使用
						  AerogenSolo（放置在湿化器端）与患者脱开HFNC单独使用喷射雾化器有相近的沉降率，当喷射雾化器通过面罩与HFNC鼻导管同时使用时沉降率最小。因此在HFNC患者中同时使用Aerogen可以为患者提供单独使用喷射雾化器相近的药物剂量，并且具备无需脱开HFNC的优点。此外，Li等人(2019)发表了一项评估在婴幼儿(5kg)和儿童(15kg)实验模型中研究HFNC期间的吸入剂量<sub class="font_10">9</sub>，对比将AerogenSolo放置于湿化器干燥端和靠近
						  患者端的区别。结果显示将AerogenSolo放置于湿化器干燥端时在各种流量设置下都有更高的沉降率，在流量比吸气流量还低时依旧如此，流量约底沉降率越高。作者特别指出，将AerogenSolo放置在靠近患者端时鼻导管中的冷凝水有所增加，而且很难位置维持AerogenSolo处于稳定位置。需要注意的是，AerogenSolo被批准放置于湿化器的干燥端<sub class="font_10">10</sub>。`,
					},
					{
						id:12,
						title:'12、您能否使用AerogenSolo为HFNC的成人患者雾化吸入有效的药物剂量？',
						content:`给HFNC患者进行雾化吸入沉降率会受设置的流量影响，流量越低沉降率越高。Alcoforado等人(2016)进行的一项HFNC成人肺内显像研究表明，设置在10-50升/分钟的流量时可以达到2-12％的肺内沉降率，流量为30升/分钟时肺内沉降率为3.76%<sub class="font_10">11</sub>。HFNC设置的流量的确会影响药物肺内沉降率，
						  较低的流速会提供较高的沉降率。Reminiac等人研究了对使用AIRVO的气道阻塞患者在30升/分钟流量时使用AerogenSolo（AIRVO连接头）对比单纯使用喷射雾化器的效果，结果显示两组患者的支气管舒张效果非常接近，并且两组患者的舒适度也非常接近<sub class="font_10">12</sub>。`,
					},
					{
						id:13,
						title:'13、不同的呼吸机参数是否影响AerogenSolo性能？',
						content:`Ari等人在2010年发表的研究表明偏流的大小会影响雾化颗粒输送<sub class="font_10">5</sub>。对于机械通气患者而言许多其它因素也会影响雾化颗粒输送，包括：吸气时间、吸气平台、每分钟通气量、吸气波形、通气模式、工作周期、呼吸频率和呼吸触发<sub class="font_10">13</sub>。在儿科模型中不同的潮气量对雾化颗粒输送没有影响<sub class="font_10">14</sub>。`,
					},
				],
				solo_list:[
					{
						id:1,
						title:'1、哪些品牌或型号的呼吸机可以与AerogenSolo一起使用？',
						content:'AerogenSolo可与任何品牌或型号的呼吸机一起使用。Aerogen已集成到Getinge(Maquet)、Getinge(Maquet)和GE/Datex-Ohmeda生产的特定型号呼吸机中。',
					},
					{
						id:2,
						title:'2、雾化单位剂量的药物需要多长时间？',
						content:`AerogenSolo的流速超过0.2毫升/分钟，平均为0.38毫升/分钟。
						  对于标准3ml剂量，需要7分53秒<sub class="font_10">10</sub>。`,
					},
					{
						id:3,
						title:'3、雾化治疗结束后会剩下多少药物？',
						content:'治疗结束后留在雾化器中的药物很少：<0.1mL<sub class="font_10">10</sub>。',
					},
					{
						id:4,
						title:'4、一次可以给多少药物？',
						content:'药杯可容纳最多6mL的药物。',
					},
					{
						id:5,
						title:'5、AerogenSolo可以与咬嘴和雾化面罩一起使用吗？',
						content:'可以，AerogenSolo可以连接到AerogenUltra并与咬嘴或雾化面罩一起使用。',
					},
					{
						id:6,
						title:'6、AerogenSolo噪音大吗？',
						content:'AerogenSolo几乎没有声音，在0.3米距离处测量的噪音水平小于35dB<sub class="font_10">10</sub>。',
					},
					{
						id:7,
						title:'7、如何清洁AerogenSolo？',
						content:'AerogenSolo是单个患者使用设备，每天间断雾化治疗4次可在呼吸机回路上使用长达28天。持续雾化时AerogenSolo最多可以使用7天。雾化结束后建议再雾化几滴生理盐水以去除残留药物（偶尔会出现粘性药剂）。不建议将AerogenSolo从呼吸机回路中取出进行清洁。',
					},
					{
						id:8,
						title:'8、雾化粘性药物后如何清除雾杯中的残留药物？',
						content:`要去除任何粘性药物残留，您可以雾化几滴生理盐水。`,
					},
					{
						id:9,
						title:'9、AerogenSolo可以雾化哪些药剂？',
						content:`AerogenSolo可用于已批准使用常规雾化器雾化吸入并由医生处方的药物。有关其它信息，请联系我们的临床团队：msl@aerogen.com。`,
					},
					{
						id:10,
						title:'10、可以在同一个AerogenSolo中同时雾化两种或更多种药物吗？',
						content:`您不需要使用多个AerogenSolo来雾化不同的药物，但你需要在两次雾化中间再雾化几滴生理盐水以清洗残留药物，特别是雾化了粘性药物之后。有关两种药物是否可以混合在一起雾化，请参考药物制造厂商出具的说明书。`,
					},
					{
						id:11,
						title:'11、AerogenSolo可以使用多长时间？',
						content:`AerogenSolo是单个患者使用设备，每天间断雾化治疗4次可以使用长达28天。持续雾化时AerogenSolo最多可以使用7天。`,
					},
					{
						id:12,
						title:'12、与常规雾化器相比，使用AerogenSolo时的药物肺部沉降率有多少？',
						content:`机械通气患者使用常规喷射雾化器肺内沉降率为3%，使用AerogenSolo的肺内沉降率为10-15％<sub class="font_10">15,16</sub>。NIV患者使用Aerogensolo的肺内沉降率比喷射雾化器增加4倍<sub class="font_10">17</sub>。自主呼吸患者使用AerogenUltra的肺内沉降率是喷射雾化器的6倍<sub class="font_10">18</sub>。`,
					},
					{
						id:13,
						title:'13、如果AerogenSolo停止雾化，我该怎么办？',
						content:`请参阅使用说明中的故障排除指南。`,
					},
					{
						id:14,
						title:'14、我如何获得更换配件？',
						content:`请联系Aerogen中国。（请参阅https://www.aerogenchina.cn）。`,
					},
					{
						id:15,
						title:'15、如果雾化导致呼吸机出气末端的呼吸过滤器饱和从而引起呼吸机报警，我该怎么办？',
						content:`这种情况很少发生。如果AerogenSolo放置于Y端，将其放置到湿化器端会减少到达出气末端呼吸过滤器的雾化颗粒（这可解决问题），并且可以提高药物肺内沉降率。报警发生时应使用新的呼吸过滤器更换饱和的呼吸过滤器，请根据呼吸机和呼吸过滤器制造厂商的建议使用过滤器。`,
					},
					{
						id:16,
						title:'16、使用AerogenSolo是否会增加回路中的冷凝水？',
						content:`使用AerogenSolo时回路中因雾化颗粒而产生的冷凝水很少。将AerogenSolo放置在湿化器的干燥端可以进一步减少回路中的冷凝水，因为较大的雾粒会凝结在湿化罐中而不是凝结在回路中。雾化时间越长，因雾化产生冷凝水的量会越多。`,
					},
					{
						id:17,
						title:'17、是否需要依据患者的体重或设置的流速调整AerogenSolo的位置？',
						content:`不需要。医护人员可选择AerogenSolo和T形接头的位置，但需要注意的是，将T形接头放置于Y端和ET管之间时会增加死腔容积，同时也会增加回路的重量。`,
					},
					{
						id:18,
						title:'18、AerogenSolo可不可以用于流量感应器在近端的新生儿呼吸机？',
						content:`请参阅呼吸机制造厂商出具的使用说明书。`,
					},
					{
						id:19,
						title:'19、雾化器是否会影响在呼吸机出气端的流量感应器/呼吸过滤器？',
						content:`任何雾化颗粒进入到呼吸机回路中都会因为增加回路中的湿度从而可能影响流量传感器和呼吸过滤器。尤其是某些呼吸机呼气流量感应器可能会受到严重影响。回路中增加的雾化颗粒会使呼吸机的呼吸过滤器更快达到饱和并增加回路阻力。雾化时应监测过滤器的状况和患者呼气阻力，可能需要定期更换过滤器。请参考呼吸机制造厂商的产品说明书和操作手册(IFU)了解有关呼吸过滤器的要求。
						  <p class="qa_con" style="margin-left:0;margin-right:0">
						  呼吸机回路末端的呼吸过滤器应常规使用并定期更换以保护呼吸机的内部装置如流量传感器。雾化粘性药物后可能需要更频繁的更换呼吸过滤器。请参考呼吸机制造厂商的产品说明书和操作手册(IFU)了解有关呼吸过滤器的要求。
						  </p>
						  `,
					},
					{
						id:20,
						title:'20、新生儿患者使用呼吸机时，应将AerogenSolo放置在回路的哪个位置？',
						content:`尽管研究显示，在新生儿回路中将AerogenSolo放置在靠近患者端时有最佳的，肺内沉降率<sub class="font_10">22</sub>，但也应注意当它放置在呼吸机侧时，其提供的药物肺内沉降率依旧满足临床需求。Berlinski等人(2016)在新生儿机械通气模型中将AerogenSolo放置于呼吸机侧分别获得了8.2%和9.5%的沉降率<sub class="font_10">22</sub>。这对于新生儿的临床治疗绰绰有余。
						  <p class="qa_con" style="margin-left:0;margin-right:0">临床医生通常更偏向于将雾化器放置在湿化器的干燥端，因为回路中的冷凝水更少、到达出气端流量传感器的雾化颗粒更少，放置在近患者端容易因为对ET管增重造成扭转、意外脱管和增加额外的死腔容积。</p>
						  `,
					},
				],
				ultra_list:[
					{
						id:1,
						title:'1、AerogenUltra可以与带单向阀或开放式的面罩一起使用吗？',
						content:`所有标准的雾化面罩都可以连接到AerogenUltra，但使用带单向阀的面罩（附带）具有最高的肺内沉降率<sub class="font_10">25</sub>。使用开放式面罩的流速应为1-6升/分钟，儿童不能应超过2升/分钟。切勿在AerogenUltra上使用封闭式面罩。`,
					},
					{
						id:2,
						title:'2、可以在AerogenUltra中加装过滤器以减少雾化颗粒排放到空气中吗？',
						content:`目前，我们没有通过批准的过滤器可以安装到带单向阀的咬嘴中。`,
					},
					{
						id:3,
						title:'3、如何清洗AerogenUltra？',
						content:`AerogenUltra属于单个患者使用的装置，可供20次间断使用（比如每天4次治疗可使用5天）或连续使用3小时。您可以定期清理AerogenUltra中过多的冷凝药液（对于持续雾化，每小时清理一次）。为确保AerogenUltra的最佳性能，可使用无菌水冲洗或摇晃以清理任何残留物，风干。`,
					},
					{
						id:4,
						title:'4、雾化粘性药物后如何清除雾杯中的残留药物？',
						content:`要去除任何粘性药剂残留，您可以喷雾几滴生理盐水。`,
					},
					{
						id:5,
						title:'5、可以使用AerogenUltra多长时间？',
						content:`AerogenUltra属于单个患者使用的装置，可供20次间断使用（比如每天4次治疗可使用5天）或连续使用3小时。`,
					},
					{
						id:6,
						title:'6、AerogenSolo/Ultra可以雾化哪些药剂？',
						content:`带Ultra的AerogenSolo适用于由当地相关部门批准使用常规雾化器雾化吸入并由具备资质的医师处方的药物。有关特定药剂和剂量的更多信息，请联系我们的临床团队：msl@aerogen.com。`,
					},
					{
						id:7,
						title:'7、我们可以在同一个AerogenSolo中同时雾化两种或更多种药物吗？',
						content:`您不需要使用多个AerogenSolo来雾化不同的药物，但你需要在两次雾化中间再雾化几滴生理盐水以清洗残留药物，特别是雾化了粘性药物之后。有关两种药物是否可以混合在一起雾化，请参考药物制造厂商出具的说明书。`,
					},
					{
						id:8,
						title:'8、当使用AerogenUltra时，我应该调整药剂剂量吗？',
						content:`AerogenUltra可用于已批准使用常规雾化器雾化吸入并由医生处方的药物。AerogenLtd无法就药物剂量提供具体建议，因为目前还没有药物/设备组合的相关批准。必须从药物制造商出具的药品使用说明书中获取有关使用剂量和使用特定相关雾化器的信息。如果您需要已发表的有使用Aerogen设备雾化特定药物的临床研究信息，请联系我们的临床团队：msl@aerogen.com。`,
					},
					{
						id:9,
						title:'9、雾化单位剂量的药物需要多长时间？',
						content:`与Ultra一起使用的AerogenSolo的流速超过0.2毫升/分钟，
						  平均为0.38毫升/分钟。对于标准3ml剂量，需要7分53秒<sub class="font_10">10</sub>。`,
					},
					{
						id:10,
						title:'10、雾化治疗结束后会剩下多少药物？',
						content:`治疗结束后留在雾化器中的药物很少：<0.1mL<sub class="font_10">10</sub>。`,
					},
					{
						id:11,
						title:'11、一次可以给多少药物？',
						content:`与AerogenUltra一起使用的AerogenSolo药杯中最多可以容纳6mL药物。`,
					},
					{
						id:12,
						title:'12、与常规喷射雾化器相比，使用AerogenUltra的药物肺内沉降率能高多少？',
						content:`自主呼吸患者使用AerogenUltra的肺内沉降率是使用常规喷射雾化器的6倍<sub class="font_10">18</sub>。`,
					},
					{
						id:13,
						title:'13、有什么证据表明与普通的雾化面罩相比，带单向阀的面罩最适合与Ultra一起使用？',
						content:`Arietal.,(2015)表明，与常规的开放式雾化面罩相比，带单向阀的面罩可为患者提供最高的肺内沉降率。使用带单向阀的面罩可以使沉降率显著提高并且与用咬嘴的沉降率相近（流量为2升/分钟时的对比）<sub class="font_10">25</sub>。`,
					},
					{
						id:14,
						title:'14、我如何给儿童患者选择使用咬嘴或面罩？',
						content:`在任何情况下都应首先评估儿童患者是否能正确配合使用咬嘴进行雾化吸入。此外《美国呼吸治疗协会临床实践指南》关于雾化吸入治疗的内容中<sub class="font_10">26</sub>建议对3岁或3岁以上的儿童患者使用咬嘴。如果患者无法正确配合使用咬嘴，则应使用面罩。请选择使用与患者面部大小匹配的面罩以保证密封度。`,
					},
				],
			}
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
</style>
