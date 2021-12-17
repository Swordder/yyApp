<template>
	<view class="content">
		<template v-if="this.$Route.query.type == 1 && this.$Route.query.apply_type == 0">
			<u-lazy-load v-for="(item, index) in oimg_list" :key="index" :image="item"></u-lazy-load>
		</template>
		<template v-else-if="this.$Route.query.type == 1 && this.$Route.query.apply_type == 1">
			<u-lazy-load v-for="(item, index) in oimg_da_list" :key="index" :image="item"></u-lazy-load>
		</template>
		<template v-else-if="this.$Route.query.type == 2 && this.$Route.query.apply_type == 0">
			<u-lazy-load v-for="(item, index) in rimg_list" :key="index" :image="item"></u-lazy-load>
		</template>
		<template v-else-if="this.$Route.query.type == 2 && this.$Route.query.apply_type == 1">
			<u-lazy-load v-for="(item, index) in rimg_da_list" :key="index" :image="item"></u-lazy-load>
		</template>
		<template v-else-if="this.$Route.query.type == 3 && this.$Route.query.apply_type == 0">
			<u-lazy-load v-for="(item, index) in pimg_list" :key="index" :image="item"></u-lazy-load>
		</template>
		<template v-else-if="this.$Route.query.type == 3 && this.$Route.query.apply_type == 1">
			<u-lazy-load v-for="(item, index) in pimg_da_list" :key="index" :image="item"></u-lazy-load>
		</template>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				oimg_list:[
					'http://img.youyao99.com/b1c65ae2a3fbd8b49304bee2a98c3350.png',
					'http://img.youyao99.com/cfb1e186305fe21dcafaaeb632155e90.png',
					'http://img.youyao99.com/ceafe3e5eb83bbcc50692615f67c5d2f.png',
					'http://img.youyao99.com/079f09869ee56dca007ca1d91d211852.png',
					'http://img.youyao99.com/cabdfc0829b0a8bc3c2e549265115243.png',

					'http://img.youyao99.com/73b735013da603353006e431a05e7639.png',
					'http://img.youyao99.com/afd0fbb04b9267ba6cd085996d0eddcd.png',
					'http://img.youyao99.com/4daf724b8f6d7858063e9e2f46921687.png',
					'http://img.youyao99.com/5f3a51c3819f16f3a6283dcbaa373de5.png',
					'http://img.youyao99.com/c4f31cbed574581a43745a41235093de.png',

					'http://img.youyao99.com/af311c6b9348b4b9ffca7ecff17e3208.png',
					'http://img.youyao99.com/887ef58e3ad8ea92976a01509e1cf27b.png',
					'http://img.youyao99.com/21abf5a77f9c6167a06ac1ec893a4067.png',
					'http://img.youyao99.com/c6d9bd67407ca797eb661d0efcce9006.png',
					'http://img.youyao99.com/7c32338d5389e6e7d860d7a00c06029c.png',

					'http://img.youyao99.com/f5b34d95572e44ae1973d7575521ddf2.png',
					'http://img.youyao99.com/441a45a40685479faa89851af0198647.png',
					'http://img.youyao99.com/70b7bfe1793da840fd04e32e26ba5bab.png',
					'http://img.youyao99.com/aeb414cc5783089acb2cdc975ac4b6c7.png',
					'http://img.youyao99.com/c864975411b22d857ae6db35d3a414cc.png',
					'http://img.youyao99.com/4ab49918bf3039c3ae11f80154a44451.png',
					'http://img.youyao99.com/5abac52f34dd3af1cf26b6b9c8e803f0.png',
				],
				oimg_da_list:[
					'http://img.youyao99.com/5f8b45d1b641833899d4614db751aa77.png',
					'http://img.youyao99.com/8bd7824bbc325a21eff4844b54ebcb74.png',
					'http://img.youyao99.com/d583262e2f109fa83a33388f9e248e78.png',
					'http://img.youyao99.com/d241b0157a3325ceecfc4093d6b793b8.png',
					'http://img.youyao99.com/b5430a0055bb3da57ae6f1d3348c5a8a.png',

					'http://img.youyao99.com/5e6adaaf2e0c843ad83531e4b5d3a14f.png',
					'http://img.youyao99.com/2ac38a5978447dda006f181b1d617321.png',
					'http://img.youyao99.com/25bc5af7b6297b43eeb84c8ca3b01c07.png',
					'http://img.youyao99.com/878a53355f45c5c36c786157a2db0203.png',
				],
				rimg_list:[
					'http://img.youyao99.com/3e0058fca4260a5ab354c3fae52171d4.png',
					'http://img.youyao99.com/af40298de0b3b9a9a4fd46bfd17cc54b.png',
					'http://img.youyao99.com/dc05535c66b5c22527797ffc34349e75.png',
					'http://img.youyao99.com/6256fa235d22d25471b9da3a05949ca2.png',
					'http://img.youyao99.com/58d85bfd15bee539d45b3008580d0fe4.png',

					'http://img.youyao99.com/15b302be21d0d44e7b41c38a3d31af02.png',
					'http://img.youyao99.com/886dbe760014b93d6a55077e4222beeb.png',
					'http://img.youyao99.com/ca2cf637f13591e96a5c090e83ef46a3.png',
					'http://img.youyao99.com/b9cb3f8514046b8e2343e84be9e7d37a.png',
					'http://img.youyao99.com/9546899718b65eb3acb4ccf508828ac6.png',

					'http://img.youyao99.com/59af871dd817f8eb35eb5c68f34595b6.png',
					'http://img.youyao99.com/994f7855e14e153df4e12d3e6e301650.png',
					'http://img.youyao99.com/ce45a112700b681783679be0e4743be5.png',
					'http://img.youyao99.com/d757107cd1d61abb590f63027062f62f.png',
					'http://img.youyao99.com/a6a13b2b3b738f5600c0ca08563fa424.png',

					'http://img.youyao99.com/beecb8d65bae2a88baf43d2db0ff0651.png',
					'http://img.youyao99.com/b1d286974361f6f5d41eff4b43b54b1c.png',
					'http://img.youyao99.com/765358db8d6e62a89a41cc1dcd2572cc.png',
					'http://img.youyao99.com/dc07fb8acba743f3cc325fd40d7bd110.png',
					'http://img.youyao99.com/a06b168448be3fe952bed11af4192c6e.png',

					'http://img.youyao99.com/d509f38002f1c550263fa049b6520670.png',
					'http://img.youyao99.com/2473a7790e7c89dd5509b1e33d834fae.png',
					'http://img.youyao99.com/031b7f87b9b1199c9bdd3841a92ea814.png',
					'http://img.youyao99.com/d90e6fa4b1493ae355e404345b7dd4c8.png',
				],
				rimg_da_list:[
					'http://img.youyao99.com/4d7608a916444b3cb161377e409ac554.png',
					'http://img.youyao99.com/d0313f98aeb9c88476ecf603a782874e.png',
					'http://img.youyao99.com/c50794e4256415bbde236537de71b85e.png',
					'http://img.youyao99.com/585ec5a148832cabd96b991dde36a170.png',
					'http://img.youyao99.com/242b209c3c015fe6b51c19d2f7490bb1.png',

					'http://img.youyao99.com/a3c2d00fa1b6d2e5d15839a021b560bc.png',
					'http://img.youyao99.com/49f10f1fa282444b28b7ac9e6c7d77e9.png',
					'http://img.youyao99.com/e8081727a15f0f079d719f5147167971.png',
					'http://img.youyao99.com/09fc153727a69fd257dc25c4f9b618a0.png',
					'http://img.youyao99.com/1cb3880ee559ee79d58c5e892edf6820.png',

				],
				pimg_list:[
					'http://img.youyao99.com/89167b12a648a5e773aa2aa1c5581263.png',
					'http://img.youyao99.com/bedbfc27283ac39212358d00cb272210.png',
					'http://img.youyao99.com/0af7f2c2b5abd14dac9bed1d341bbac3.png',
					'http://img.youyao99.com/9179d8f9e27876a4b7a86f0fea3d933f.png',
					'http://img.youyao99.com/e642d0b7f27ba338060a5148a5aeb35e.png',

					'http://img.youyao99.com/02b7acfe4984c3acdc478efb04029ae9.png',
					'http://img.youyao99.com/56788f79d77600afacaabbd690d8252c.png',
					'http://img.youyao99.com/e0f754f0d8e6acf3e795abb24f2c5b23.png',
					'http://img.youyao99.com/46c53d28b04221c977b4325b109ed75d.png',
					'http://img.youyao99.com/61b170c9a099207601ee98938d14e09e.png',

					'http://img.youyao99.com/cca3ec20a5f1eeee808ac0d2a4b9e719.png',
					'http://img.youyao99.com/7825231970e530d268a60af23818da0b.png',
					'http://img.youyao99.com/91201f8f870d98b8dee510f08a5accb8.png',
					'http://img.youyao99.com/955a8d0460c60be1de9737a91fa70c80.png',
					'http://img.youyao99.com/d31c8126a11e492d4379ca8916e64739.png',

					'http://img.youyao99.com/8e163f5eb7520922195044e5c37c16c4.png',
					'http://img.youyao99.com/2f2a11689e29b2d8dce3ec4049c98f43.png',
					'http://img.youyao99.com/943b267b2417c4686b7332bcd785a86e.png',
					'http://img.youyao99.com/9dffab5df0edf0da4d9f837bf718bbc5.png',
					'http://img.youyao99.com/233f1a78ea24cfd8ef7b6a670eb96e50.png',
				],
				pimg_da_list:[
					'http://img.youyao99.com/921cb21e7688e4bbbb1b2cbb5e32a93f.png',
					'http://img.youyao99.com/a335fdec34e01fa8d67aae4cacf357cf.png',
					'http://img.youyao99.com/3eda96029543cad4a4b547f95d298aa2.png',
					'http://img.youyao99.com/f94f6b9eb0d88d9e394b9c695ddee111.png',
					'http://img.youyao99.com/cbed9204cfab22a3990562aac5181422.png',

					'http://img.youyao99.com/560048812b5351fa31070fada6a2ead4.png',
					'http://img.youyao99.com/cf923517210039625f215aeccd8d8289.png',
					'http://img.youyao99.com/8daec82409300205a1ff451ad155aa3e.png',
				],
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
