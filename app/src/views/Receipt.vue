<template>
  <div>
    <h2>Your Receipt</h2>
    <div class="btn btn-primary" @click.prevent="showReceipt" v-if="!showRec">Show Receipt</div>
    <div v-if="showRec">
      <div>
        <ItemCard
          v-for="(item, index) in items"
          :key="index"
          :item="item"/>
      </div>
      <h3>Sales Tax: {{Number(grandTotal - total).toFixed(2)}}</h3>
      <h3>Total: {{Number(total).toFixed(2)}}</h3>
      <h2>Grand Total: {{Number(grandTotal).toFixed(2)}}</h2>
    </div>
  </div>
</template>

<script>
import ItemCard from '../components/ItemCard'

export default {
  name: 'Receipt',
  data () {
    return {
      grandTotal: 0,
      total: 0,
      tax: 0,
      importDuty: 0,
      itemsFetched: false,
      showRec: false
    }
  },
  components: {
    ItemCard
  },
  methods: {
    calculateGrandTotal () {
      this.grandTotal = 0
      this.total = 0
      this.tax = 0
      this.importDuty = 0
      this.items.forEach(element => {
        if (element.category === 'Other') {
          this.tax = (element.price * element.quantity * 0.1)
        }
        if (element.imported === 'Imported') {
          this.importDuty = Number(element.price * element.quantity * 0.05)
        }
        this.total += (element.price * element.quantity)
        this.grandTotal += (element.price * element.quantity) + Math.round((Number(this.tax + this.importDuty) * 20)) / 20
        this.tax = 0
        this.importDuty = 0
      })
    },
    showReceipt () {
      this.calculateGrandTotal()
      this.showRec = true
    }
  },
  computed: {
    items () {
      console.log('Computed Triggered!')
      return this.$store.state.items
    }
  },
  watch: {
    itemsFetched () {
      this.calculateGrandTotal()
    }
  }
}
</script>

<style>

</style>
