const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapiserver.reactbd.com/amazonproducts');
  const data = await response.json();
  return data;
};



const displayFeaturedProducts = async () => {
  const products = await fetchProducts();
  const container = document.getElementById('featured-products');
  container.innerHTML = products.map(product => `
    <div class="col mb-5">
        <div class="card h-100">
            <img class="card-img-top" src="${product.image.trim()}" alt="${product.title.trim()}" />
            <!-- Product details -->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name -->
                    <h5 class="fw-bolder">${product.title.trim()}</h5>
                    <!-- Product price -->
                    <span class="text-muted text-decoration-line-through">$${product.oldPrice?.toFixed(2)}</span>
                    $${product.price?.toFixed(2)}
                </div>
            </div>
            <!-- Product actions -->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                    <a class="btn btn-outline-dark mt-auto" href="#">View options</a>
                </div>
            </div>
        </div>
    </div>
    `).join('');
};

displayFeaturedProducts();