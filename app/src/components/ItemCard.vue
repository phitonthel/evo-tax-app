<template>
  <div class="card">
    <div class="row">
      <div class="card-content col-8 m-2">
        <h5 class="card-title">{{item.name}}</h5>
        <div>Category: {{item.category}}</div>
        <div>Quantity: {{item.quantity}}</div>
        <div>Price: {{item.price}}</div>
      </div>
      <div class="card-body">
        <h5>Total: USD {{Number(item.price*item.quantity + tax + importDuty).toFixed(2)}}</h5>
        <div> price: {{item.price*item.quantity}}</div>
        <div>+ tax: {{tax}}</div>
        <div>+ import: {{importDuty}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: ['item'],
  data () {
    return {
      tax: 0,
      importDuty: this.item.price * this.item.quantity * 0.05
    }
  },
  created () {
    if (this.item.category !== 'Other') {
      this.tax = this.item.price * this.item.quantity * 0.1
    } else {
      this.tax = this.item.price * this.item.quantity * 0.05
    }
  }
}
</script>

<style>

</style>
