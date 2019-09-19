<template>
	<div class="order">
		<div class="order-image">
			<img :src="order.images.full_size" alt="" class="img-fluid">
			<button class="back-button"><i class="material-icons">keyboard_arrow_left</i></button>
		</div>
		<div class="order-details">
			<div class="order-detail-header">
				<div class="order-name">{{ order.name }}</div>
				<div class="order-publication">
					<span class="order-publication-name">{{ order.publication }}</span>
				</div>
				<div class="order-description">{{ order.full_description }}</div>
			</div>
		</div>
		<div class="order-form">
			<div class="form-group">
				<label class="font-weight-bold" for="inputLink">source</label>
				<input type="text" v-model="url" class="form-control" id="inputLink" aria-describedby="inputLink" placeholder="enter a link" @input="onInputUrl()">
				<small id="inputLink" class="form-text text-danger" v-if="!isValidURL">enter a valid url/link</small>
			</div>

			<div class="form-group">
				<label class="font-weight-bold" for="inputInstructions">instructions</label>
				<input type="text" v-model="instruction" class="form-control" id="inputInstructions" aria-describedby="inputInstructions" placeholder="enter your instructions" @input="onInputInstruction()">
				<small id="inputInstructions" class="form-text text-danger" v-if="!isValidInstruction">instructions no more than 30 words</small>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label class="font-weight-bold" for="inputNumberOfWriters">number of writers</label>
						<select class="form-control" id="inputNumberOfWriters" v-model="numberOfWriters">
							<option v-for="(item, index) in maxWriters" :key="index">{{ item }}</option>
						</select>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label class="font-weight-bold" for="inputInstructions">budget (USD)</label>
						<input type="number" v-model="budget" class="form-control" id="inputInstructions" aria-describedby="inputInstructions" placeholder="enter your budget" @input="onInputBudget()">
						<small id="inputInstructions" class="form-text text-danger" v-if="!isValidBudget">budget should be a number between 5 and 500</small>
					</div>
				</div>
			</div>

		</div>
		<div class="order-options">
			<div class="order-options-header">Please select options (optional)</div>
			<div class="table-list-item">
				<table class="table">
					<tbody>
						<tr v-for="(item, index) in order.options" :key="index">
							<td>{{ item.name }}</td>
							<td><span class="text-muted" v-if="item.increase">(add {{ item.increase }}%)</span></td>
							<td><input type="radio" @click="addSelected(item)"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="order-submit">
			<button class="btn btn-primary btn-lg btn-block btn-submit" :disabled="!isValidInput">
				<i class="material-icons icon-cart">shopping_cart</i>SUBMIT<span class="total-order">$ {{ totalOrder }}</span>
			</button>
		</div>
	</div>
</template>

<script>
import { validURL, limitCharacters, validateBetweenNumber } from '@/lib/helper';

export default {
	name: 'Order',
	components: {},
	props: {
		order: {
			type: Object,
			required: null,
		},
	},
	data() {
		return {
			maxWriters: 15,
			url: null,
			instruction: null,
			numberOfWriters: 1,
			budget: 5,
			isValidURL: true,
			isValidInstruction: true,
			isValidBudget: true,
			selectedOptions: [],
		};
	},
	created() {},
	destroyed() {},
	mounted() {
		console.log(this.order);
	},
	methods: {
		onInputUrl() {
			if (this.url) {
				const isValidUrl = validURL(this.url);
				this.isValidURL = isValidUrl;
			} else {
				this.isValidURL = true;
			}
		},
		onInputInstruction() {
			if (this.instruction) {
				const isValidInstruction = limitCharacters(this.instruction, 0, 30);
				this.isValidInstruction = isValidInstruction;
			} else {
				this.isValidInstruction = true;
			}
		},
		onInputBudget() {
			if (this.budget) {
				const isValidBudget = validateBetweenNumber(this.budget, 5, 500);
				this.isValidBudget = isValidBudget;
			} else {
				this.isValidBudget = false;
			}
		},
		addSelected(item) {
			this.selectedOptions.push(item);
		},
	},
	computed: {
		totalOrder() {
			const plusPercentage = this.totalPercentageAdded / 100;
			const total = (parseInt(this.numberOfWriters) * parseInt(this.budget));
			const totalSum = (parseInt(this.numberOfWriters) * parseInt(this.budget)) * plusPercentage;
			const totalPrice = totalSum + total;
			return totalPrice;
		},
		isValidInput() {
			const isInputFilled = (this.url) && (this.budget);
			const isValidValidation = this.isValidURL && this.isValidInstruction && this.isValidBudget;
			const isValid = isValidValidation && isInputFilled;
			return isValid;
		},
		totalPercentageAdded() {
			let totalPercentage = 0;
			for (let index = 0; index < this.selectedOptions.length; index++) {
				const option = this.selectedOptions[index];
				const increase = option.increase ? option.increase : 0;
				totalPercentage = parseInt(totalPercentage) + parseInt(increase);
			}
			return totalPercentage;
		},
	},
};
</script>

<style lang="scss" scoped>
.form-control {
	background-color: #F8F8FA;
    border: 0;
}

.order {
	.order-image {
		position: relative;
	}

	.back-button {
		border-radius: 20px;
		width: 40px;
		height: 40px;
		position: absolute;
		left: 5px;
		top: 5px;

		i {
			font-size: 32px;
			position: relative;
			top: 2px;
			left: -4px;
			color: #b1b1b1;
		}
	}
}

.order-details {
	padding: 1em 1em 0;

	.order-name {
		font-size: 20px;
		font-weight: bold;
	}

	.order-publication-name {
		padding: 5px;
		background-color: #f9f9f9;
		border-radius: 5px;
		color: #52B988;
	}

	.order-description {
		color: #254D8C;
		font-weight: bold;
		margin-top: 1em;
	}
}

.order-form {
	padding: 1em 1em 0;
	margin-top: 5px;
	border-top: 1px solid #b1b1b1;
}

.order-options {
	.order-options-header {
		padding: 1em;
		background-color: #E5E5E5;
		color: #000;
		font-weight: bold;
	}
}

.order-submit {
	padding: 1em;

	.btn-submit {
		position: relative;
		border-radius: 10px;
		font-weight: bold;

		.icon-cart {
			position: absolute;
			left: 15px;
			top: 10px;
		}

		.total-order {
			position: absolute;
			right: 15px;
			top: 10px;
		}
	}
}
</style>
