<template>
  <div>
    <NavBar />
    <div class="container">
      <header class="header">
        <h1 class="center-align">Welcome to Our Hardware Store</h1>
      </header>
      <div class="row">
        <!-- Sidebar for Categories -->
        <div class="col s12 m3 categories-sidebar">
          <div class="collection with-header">
            <div class="collection-header"><h5>Categories</h5></div>
            <a v-if="categories.length === 0" class="collection-item">No categories available</a>
            <a v-for="category in categories" :key="category.id" href="#!" class="collection-item">
              <img v-if="category.image" :src="category.image" alt="Category Image" class="circle category-image">
              {{ category.name }}
            </a>
          </div>
        </div>

        <!-- Product Section -->
        <div class="col s12 m9">
          <div class="row">
            <div v-if="products.length === 0" class="col s12"><p>No products available</p></div>
            <div class="col s12 m6 l4" v-for="product in products" :key="product.id">
              <div class="card hoverable">
                <div class="card-image">
                  <img :src="product.imageName ? getProductImage(product.productId) : '/assets/default.jpg'" alt="Product Image">
                  <span class="card-title">{{ product.name }}</span>
                </div>
                <div class="card-content">
                  <p>{{ product.description }}</p>
                  <p><strong>Price:</strong> R{{ product.price }}</p>
                </div>
                <div class="card-action">
                  <a class="btn-flat blue-text" href="/cart">Add to Cart</a>
                  <a class="btn-flat orange-text" :href="'/product/' + product.id">View Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-align" style="margin-top: 20px;">
        <router-link to="/about" class="btn btn-primary">About Us</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getProducts } from '@/services/productService.js';
import { getCategories } from '@/services/categoryService';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'HomePage',
  components: {
    NavBar
  },
  data() {
    return {
      products: [],
      categories: [],
    };
  },
  async created() {
    await this.fetchProducts();
    await this.fetchCategories();
  },
  methods: {
    async fetchProducts() {
      try {
        this.products = await getProducts();
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchCategories() {
      try {
        this.categories = await getCategories();
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    getProductImage(productId) {
      return `http://localhost:5119/ecommerce/products/${productId}/image`;
    },
  }
};
</script>

<style scoped>
.header {
  margin-top: 20px;
}

.container {
  margin-top: 20px;
}

.categories-sidebar {
  padding-right: 20px;
  border-right: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  padding: 15px;
}

.collection .collection-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background 0.3s;
}

.collection .collection-item:hover {
  background-color: #f1f1f1;
}

.collection .collection-item img.category-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
}

.card {
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-title {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
}

.card-content {
  padding: 15px;
}

.card-action {
  background: #f5f5f5;
  padding: 10px;
  text-align: center;
}

.card-action a {
  color: #007bff;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

.card-action a:hover {
  text-decoration: underline;
}

.center-align {
  text-align: center;
}

.btn-primary {
  background-color: #26a69a;
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.btn-primary:hover {
  background-color: #2bbbad;
}
</style>