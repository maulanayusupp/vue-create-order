<template>
	<div class="home">
		<div class="container p-5 text-center">
			<button type="button" class="btn btn-primary btn-create-order" data-toggle="modal" data-target="#modalCreateOrder">
				Create new order
			</button>
		</div>

		<modal-create-order :order="order"></modal-create-order>
	</div>
</template>

<script>
import { order } from '@/lib/statics';
import ModalCreateOrder from '@/components/ModalCreateOrder.vue';

export default {
	name: 'home',
	components: {
		ModalCreateOrder,
	},
	data() {
		return {
			order,
		};
	},
	mounted() {},
};
</script>
