# E-commerce avec JavaScript
### Un projet personnel d'application e-commerce développé en JavaScript. 
Ce site internet inclut les fonctionnalités principales d'une boutique en ligne :

_Légende_ <br>
✅Fonctionalité développée <br> 
🔄Fonctionalité en cours de développement

- ✅Page produit : Affichage des produits
- 🔄Page produit : Affichage détails produits.
- Page de détail : Description approfondie de chaque produit.
- Panier : Gestion des articles ajoutés par l'utilisateur, avec possibilité de modifier les quantités ou de supprimer des articles.
- Achat : Processus de commande complet pour finaliser les transactions.
- Idéal pour les passionnés de développement cherchant à comprendre ou à expérimenter la création d'applications e-commerce.

## Affichage des produits 
J'ai utilisé un fetch API pour récupérer et afficher une liste de produits Amazon à partir d'une API externe. Voici un aperçu du fonctionnement :
```javascript
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

```

![image](https://github.com/user-attachments/assets/d6d56338-2036-44b7-b74c-0e95200e7a34)


