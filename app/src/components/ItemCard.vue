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
        <h5>Total: USD {{Number((item.price * item.quantity) + tax + importDuty).toFixed(2)}}</h5>
        <div> price: {{Number(item.price*item.quantity).toFixed(2)}}</div>
        <div>+ tax: {{Number(tax).toFixed(2)}}</div>
        <div>+ import: {{Number(importDuty).toFixed(2)}}</div>
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
      importDuty: 0
    }
  },
  created () {
    if (this.item.category === 'Other') {
      this.tax = Number(this.item.price * this.item.quantity * 0.1)
    }
    if (this.item.imported === 'Imported') {
      this.importDuty = Number(this.item.price * this.item.quantity * 0.05)
    }
  }
}
</script>

<style>

</style>
