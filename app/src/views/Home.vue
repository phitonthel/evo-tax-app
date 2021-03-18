<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="https://pbs.twimg.com/profile_images/1208979522957131778/4ZkknINs.jpg"
      width="100px"
    />
    <h2>Evo Smart Life - Tax Calculator</h2><br>
    <div class="container">
      <div class="d-flex justify-content-center">
        <form class="col-4">
          <div class="form-group">
            <label for="name">Name of Item</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Name"
              v-model="name"
            />
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select class="form-control" v-model="category">
              <option>Book</option>
              <option>Food</option>
              <option>Medical</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="quantity">Quantity of Item</label>
            <input
              type="number"
              class="form-control"
              id="quantity"
              placeholder="Quantity"
              v-model="quantity"
            />
          </div>
          <div class="form-group">
            <label for="price">Price of one Item</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="price"
              placeholder="Price"
              v-model="price"
            />
          </div>
          <div class="btn btn-primary" @click.prevent="addItem">Add to Cart</div>
        </form>
        <div class="col-8">
          <p class="text-danger" v-if="items.length == 0">There are no items. Please fill the form to add!</p>
          <div>
            <ItemCard
              v-for="(item, index) in items"
              :key="index"
              :item="item"/>
            <div class="btn btn-danger m-3" @click.prevent="receipt">Print Receipt</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemCard from '../components/ItemCard'
import Swal from 'sweetalert2'
import router from '../router/index'

export default {
  name: 'Home',
  components: {
    ItemCard
  },
  data () {
    return {
      name: '',
      category: '',
      price: 0,
      quantity: 0
    }
  },
  methods: {
    addItem () {
      const payload = {
        name: this.name,
        category: this.category,
        price: Number(this.price).toFixed(2),
        quantity: Number(this.price).toFixed(2)
      }
      for (const key in payload) {
        const element = payload[key]
        if (!element) {
          Swal.fire('Please fill all the form!')
          return
        }
      }
      this.$store.dispatch('addItems', payload)
    },
    receipt () {
      router.push('/receipt')
    }
  },
  computed: {
    items () {
      return this.$store.state.items
    }
  }
}
</script>
