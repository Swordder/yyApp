<template>
	<view class="content u-m-30">
		<u-row 
		class="qu_an_item u-p-40 u-m-b-20" 
		gutter="16" 
		v-for="item in qu_list" 
		:key="item.id"
		@click="toNextPage('/pages/products/aerogenApply/aerogenQuAnwser',item.qu_type)">
			<u-col span="8">
				<view class="demo-layout bg-purple-light">{{item.content}}</view>
			</u-col>
			<u-col span="4" :style="{'textAlign':'right','color':'#0077C8'}">
				<text class="custom-icon">&#xe61e;</text>
			</u-col>
		</u-row>
		<view class="u-font-32 u-m-t-30 u-m-b-20 u-p-l-20 u-p-r-20" :style="{'fontWeight':'bold'}">参考文献</view>
		<view class="">
			<view class="u-m-b-10 u-font-24 u-p-l-20 u-p-r-20" v-for="item in art_list" :key="item.id">
				{{item.art_title}}
			</view>	
		</view>
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
				qu_list:[
					{
						id:1,
						content:'一般常见问题解答',
						qu_type:'com_problem'
					},
					{
						id:2,
						content:'Aerogen Solo常见问题解答',
						qu_type:'solo_problem'
					},
					{
						id:3,
						content:'Aerogen Ultra常见问题解答',
						qu_type:'ultra_problem'
					}
				],
				art_list:[
					{
						id:1,
						art_title:`1. Ari A, Areabi H, Fink JB, Cpft PT, Areabi H, Rrt M et al. Evaluation of aerosol generator devices at 3
						locations in humidified and non-humidified circuits during adult mechanical ventilation. Respir Care 2010;
						55: 837–844.`
					},
					{
						id:2,
						art_title:`2. Lin HL, Fink JB, Zhou Y, Cheng YS. Influence of moisture accumulation in inline spacer on delivery of
						aerosol using metered-dose inhaler during mechanical ventilation. Respir Care 2009; 54: 1336–1341.`
					},
					{
						id:3,
						art_title:`3. Kaminsky DA, Bates JH, Irvin CG. Effects of cool, dry air stimulation on peripheral lung mechanics in
						asthma. Am J Respir Crit Care Med 2000; 162: 179–186.`
					},
					{
						id:4,
						art_title:`4. Saeed H, Abdelrahim MEA, Fink JB. Stability of commonly nebulised drugs in heated and humid
						condition. Med Sci 2018; 7: 269–76.`
					},
					{
						id:5,
						art_title:`5. Ari A, Atalay OT, Harwood R, Sheard MM, Aljamhan EA, Fink JB. Influence of nebuliser type, position,
						and bias flow on aerosol drug delivery in simulated paediatric and adult lung models during mechanical
						ventilation. Respir Care 2010; 55: 845–851.`
					},
					{
						id:6,
						art_title:`6. Berlinski A, Willis JR. Albuterol delivery by 4 different nebulisers placed in 4 different positions in a
						paediatric ventilator in vitro model. Respir Care 2013; 58: 1124–1133.`
					},
					{
						id:7,
						art_title:`7. Ari A, Fink JB. Aerosol Drug Delivery During Mechanical Ventilation: Devices, Selection, Delivery
						Technique, and Evaluation of Clinical Response to Therapy. Clin Pulm Med 2015; 22: 79–86.`
					},
					{
						id:8,
						art_title:`8. Reminiac F, Vecellio L, Loughlin RM, Le Pennec D, Cabrera M, Vourc’h NH et al. Nasal high flow
						nebulisation in infants and toddlers: An in vitro and in vivo scintigraphic study. Pediatr Pulmonol 2017; 52:
						337–344.`
					},
					{
						id:9,
						art_title:`9. Li J, Gong L, Ari A, Fink JB. Decrease the flow setting to improve trans‐nasal pulmonary aerosol delivery
						via “high‐flow nasal cannula” to infants and toddlers. Pediatr Pulmonol 2019; : ppul.24274.`
					},
					{
						id:10,
						art_title:`10. Aerogen Solo System Instruction Manual. Aerogen Ltd. P/N 30-354, Part No. AG-AS3050.`
					},
					{
						id:11,
						art_title:`11. Alcoforado L, Ari A, De Melo Barcelar J, Brandao SS, Fink JB, Dornelas De Andrade A. Comparison
						of Aerosol Deposition with Heated and Unheated High Flow Nasal Cannula (HFNC) in Healthy Adults.
						Poster Present ATS 2016.`
					},
					{
						id:12,
						art_title:`12. Reminiac F, Vecellio L, Bodet-Contentin L, Gissot V, Le Pennec D, Salmon Gandonniere C et al. Nasal
						high-flow bronchodilator nebulisation: a randomized cross-over study. Ann Intensive Care 2018; 8: 128.`
					},
					{
						id:13,
						art_title:`13. Dhand R. Basic techniques for aerosol delivery during mechanical ventilation. Respir Care 2004; 49:
						611–22.`
					},
					{
						id:14,
						art_title:`14. Berlinski A, Willis JR. Effect of Tidal Volume and Nebuliser Type and Position on Albuterol Delivery in a
						Paediatric Model of Mechanical Ventilation. Respir Care 2015; 60: 1424–1430.`
					},
					{
						id:15,
						art_title:`15. Dugernier J, Reychler G, Wittebole X, Roeseler J, Depoortere V, Sottiaux T et al. Aerosol delivery with
						two ventilation modes during mechanical ventilation: a randomized study. Ann Intensive Care 2016; 6: 73.`
					},
					{
						id:16,
						art_title:`16. MacIntyre NR, Silver RM, Miller CW, Schuler F, Coleman RE. Aerosol delivery in intubated, mechanically
						ventilated patients. Crit Care Med 1985; 13: 81–84.`
					},
					{
						id:17,
						art_title:`17. Galindo-Filho VC, Ramos ME, Rattes CS, Barbosa AK, Brandao DC, Brandao SCS et al. Radioaerosol
						Pulmonary Deposition Using Mesh and Jet Nebulisers During Noninvasive Ventilation in Healthy Subjects.
						Respir Care 2015; 60: 1238–1246.`
					},
					{
						id:18,
						art_title:`18. Dugernier J, Hesse M, Vanbever R, Depoortere V, Roeseler J, Michotte JB et al. SPECT-CT Comparison
						of Lung Deposition using a System combining a Vibrating-mesh Nebuliser with a Valved Holding Chamber
						and a Conventional Jet Nebuliser: a Randomized Cross-over Study. Pharm Res 2017; 34: 290–300.`
					},
					{
						id:19,
						art_title:`19. Abdelrahim ME, Plant P, Chrystyn H. In-vitro characterisation of the nebulised dose during non-invasive
						ventilation. J Pharm Pharmacol 2010; 62: 966–972.`
					},
					{
						id:20,
						art_title:`20. Berlinski A, Velasco J. Albuterol Delivery Efficiency in a Paediatric Model of Noninvasive Ventilation With
						a Single-Limb Circuit. Respir Care 2019; : respcare.06622.`
					},
					{
						id:21,
						art_title:`21.Velasco J, Berlinski A. Albuterol Delivery Efficiency in a Paediatric Model of Noninvasive Ventilation With
						Double-limb Circuit. Respir Care 2018; 63: 141–146.`
					},
					{
						id:22,
						art_title:`22.Berlinski A, Kumaran S. Particle Size Characterization of Nebulised Albuterol Delivered by a Vibrating
						Mesh Nebuliser Through Paediatric Endotracheal Tubes. POster Present ATS 2016.`
					},
					{
						id:23,
						art_title:`23.Dubus JC, Vecellio L, De Monte M, Fink JB, Grimbert D, Montharu J et al. Aerosol deposition in neonatal
						ventilation. Pediatr Res 2005; 58: 10–14.`
					},
					{
						id:24,
						art_title:`24.Ní Mhurchú Sorcha, Brady Paul, McKenna Cathy, Bennett Gavin , Joyce Mary, Sweeney Louise MR.
						Effect of Nebuliser Position on Aerosol Delivery during Mechanical Ventilation of a Neonate. Irish Thorac
						Soc poster 2018.`
					},
					{
						id:25,
						art_title:`25.Ari A, Fink JB, de Andrade AD, AlHamad B, Sheard M, AlHamad B et al. Performance Comparisons of
						Jet and Mesh Nebulisers Using Different Interfaces in Simulated Spontaneously Breathing Adults and
						Children. J Aerosol Med Pulm Drug Deliv 2015; 28: 281–289.`
					},
					{
						id:26,
						art_title:`26.Ari A, Pt R, Faarc C, Restrepo RD, Faarc R. AARC Clinical Practice Guideline Aerosol Delivery Device
						Selection for Spontaneously Breathing Patients: 2012. 2012. doi:10.4187/respcare.01756.`
					},
					{
						id:27,
						art_title:`27.Aerogen Pro System Instruction Manual. Aerogen Ltd. Part No. AG-AP1080 P/N 30-040. Aerogen Ltd.`
					}
				]
			}
		},
		methods:{
			toNextPage(url,type){
				this.$Router.push({
					path:url,
					query:{
						qu_type:type
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		padding-bottom: 160rpx;
	}
	.qu_an_item{
		font-weight: bold;
		box-shadow: 0px 0px 6px 0px rgba(210, 210, 210, 0.5);
	}
</style>
