<template>
	<div class="modal-create-order">
		<div class="modal fade" id="modalCreateOrder" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Create order</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<order :order="order"></order>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import Order from '@/components/Order.vue';

export default {
	name: 'ModalCreateOrder',
	components: {
		Order,
	},
	props: {
		order: {
			type: Object,
			required: null,
		},
	},
	data() {
		return {};
	},
	created() {},
	destroyed() {},
	mounted() {},
	methods: {},
	computed: {},
};
</script>

<style lang="scss" scoped>
.modal-body {
	padding: 0;
}
</style>
