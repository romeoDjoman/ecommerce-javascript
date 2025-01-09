### **Travaux Pratiques : Création d'un Site E-Commerce en JavaScript**

#### **1. Objectifs**
- Développer un site e-commerce interactif en JavaScript pur.
- Gérer les données (produits, panier, utilisateurs) via des structures JavaScript.
- Dynamiser l'interface utilisateur en manipulant le DOM.

---

### **Étape 1 : Configuration de Base**
**Objectifs :**  
- Mettre en place la structure des fichiers.  
- Configurer le projet pour un environnement local.

**Structure des fichiers :**
```
ecommerce-js/
├── index.html        (page d'accueil)
├── product.html      (page produit détaillée)
├── cart.html         (page panier)
├── checkout.html     (page de paiement)
├── style.css         (feuille de styles)
├── script.js         (script principal)
└── db.json           (données simulées)
```

**Contenu minimal des fichiers :**
1. **index.html** : Contient la structure de la page d'accueil.
2. **style.css** : Ajoutez un style de base pour les pages.
3. **script.js** : Contiendra toutes les fonctionnalités JavaScript.
4. **db.json** : Simule une base de données :
   ```json
   {
     "products": [
       { "id": 1, "name": "Produit A", "price": 20, "stock": 10, "category": "Catégorie 1", "image": "image1.jpg" },
       { "id": 2, "name": "Produit B", "price": 15, "stock": 5, "category": "Catégorie 2", "image": "image2.jpg" }
     ],
     "cart": [],
     "users": []
   }
   ```

---

### **Étape 2 : Création de la Page d'Accueil**
**Objectifs :**  
- Dynamiser l'affichage des produits en vedette et des catégories principales.

**Instructions :**
1. Ajoutez dans `index.html` une structure pour afficher les produits :
   ```html
   <div id="carousel">Carrousel ici</div>
   <div id="featured-products" class="grid"></div>
   ```

2. En `script.js` :
   - Chargez les produits depuis `db.json` :
     ```javascript
     const fetchProducts = async () => {
         const response = await fetch('./db.json');
         const data = await response.json();
         return data.products;
     };
     ```
   - Générez dynamiquement le contenu :
     ```javascript
     const displayFeaturedProducts = async () => {
         const products = await fetchProducts();
         const container = document.getElementById('featured-products');
         container.innerHTML = products.map(product => `
           <div class="product">
             <img src="${product.image}" alt="${product.name}">
             <h3>${product.name}</h3>
             <p>${product.price}€</p>
             <button onclick="addToCart(${product.id})">Ajouter au panier</button>
           </div>
         `).join('');
     };
     displayFeaturedProducts();
     ```

**Variables/Fonctions/Objets :**
- `products`: Tableau des produits chargés depuis `db.json`.
- `displayFeaturedProducts()`: Affiche les produits en vedette.
- `addToCart(productId)`: Ajoute un produit au panier.

---

### **Étape 3 : Gestion des Produits**
**Objectifs :**  
- Implémenter une page produit détaillée.

**Instructions :**
1. Dans `product.html` :
   - Ajoutez une section pour afficher les détails d'un produit :
     ```html
     <div id="product-details"></div>
     ```

2. En `script.js` :
   - Implémentez une fonction pour charger les détails d'un produit :
     ```javascript
     const loadProductDetails = async (productId) => {
         const products = await fetchProducts();
         const product = products.find(p => p.id === productId);
         const container = document.getElementById('product-details');
         container.innerHTML = `
           <img src="${product.image}" alt="${product.name}">
           <h1>${product.name}</h1>
           <p>${product.price}€</p>
           <p>${product.description || 'Aucune description disponible'}</p>
           <button onclick="addToCart(${product.id})">Ajouter au panier</button>
         `;
     };
     ```

3. Chargez les détails en fonction de l'ID passé dans l'URL :
   ```javascript
   const urlParams = new URLSearchParams(window.location.search);
   const productId = parseInt(urlParams.get('id'));
   if (productId) loadProductDetails(productId);
   ```

---

### **Étape 4 : Gestion du Panier**
**Objectifs :**  
- Ajouter une fonctionnalité de gestion du panier.

**Instructions :**
1. Dans `cart.html` :
   - Ajoutez une table pour afficher les produits :
     ```html
     <table id="cart-items">
       <thead>
         <tr>
           <th>Produit</th>
           <th>Prix</th>
           <th>Quantité</th>
           <th>Total</th>
           <th>Actions</th>
         </tr>
       </thead>
       <tbody></tbody>
     </table>
     ```

2. En `script.js` :
   - Implémentez la gestion du panier :
     ```javascript
     let cart = [];

     const addToCart = (productId) => {
         const product = cart.find(item => item.id === productId);
         if (product) {
             product.quantity++;
         } else {
             cart.push({ id: productId, quantity: 1 });
         }
         updateCart();
     };

     const updateCart = () => {
         const cartTable = document.querySelector('#cart-items tbody');
         cartTable.innerHTML = cart.map(item => `
           <tr>
             <td>${item.name}</td>
             <td>${item.price}€</td>
             <td>
               <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
             </td>
             <td>${item.quantity * item.price}€</td>
             <td><button onclick="removeFromCart(${item.id})">Supprimer</button></td>
           </tr>
         `).join('');
     };

     const removeFromCart = (productId) => {
         cart = cart.filter(item => item.id !== productId);
         updateCart();
     };
     ```

**Variables/Fonctions/Objets :**
- `cart`: Tableau contenant les articles du panier.
- `addToCart(productId)`: Ajoute un article au panier.
- `updateCart()`: Met à jour l'affichage du panier.
- `removeFromCart(productId)`: Supprime un article du panier.

---

### **Étape 5 : Page de Paiement**
**Objectifs :**  
- Implémenter une page de paiement simple.

**Instructions :**
1. Dans `checkout.html` :
   - Ajoutez un formulaire de paiement basique :
     ```html
     <form id="checkout-form">
       <input type="text" placeholder="Nom" required>
       <input type="email" placeholder="Email" required>
       <input type="text" placeholder="Adresse" required>
       <button type="submit">Payer</button>
     </form>
     ```

2. En `script.js` :
   - Gérez la soumission du formulaire :
     ```javascript
     const processPayment = (event) => {
         event.preventDefault();
         alert('Paiement effectué avec succès !');
         cart = [];
         updateCart();
     };

     const checkoutForm = document.getElementById('checkout-form');
     checkoutForm.addEventListener('submit', processPayment);
     ```

---

### **Évaluation**
Les étudiants doivent :  
1. Implémenter chaque fonctionnalité décrite.  
2. Manipuler le DOM avec JavaScript pur.  
3. Simuler des données avec un fichier JSON et utiliser `fetch` pour les récupérer.  
4. Tester et valider les fonctionnalités du site.

Ce TP fournit une expérience complète en **JavaScript pur**, couvrant à la fois l'interface utilisateur et la logique métier.