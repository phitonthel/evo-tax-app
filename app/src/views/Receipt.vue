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
      tax: 0,
      import: 0,
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
      this.tax = 0
      this.import = 0
      this.items.forEach(element => {
        if (element.category !== 'Other') {
          this.tax = element.price * element.quantity * 0.1
        } else {
          this.tax = element.price * element.quantity * 0.05
        }
        this.import = element.price * element.quantity * 0.05
        this.grandTotal += (element.price * element.quantity) + this.tax + this.import
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
