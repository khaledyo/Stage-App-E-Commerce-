<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stage App E-Commerce</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            background: white;
            padding: 40px 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.2rem;
            color: #7f8c8d;
        }

        .tech-stack {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin-bottom: 30px;
        }

        .tech-stack h2 {
            color: #2c3e50;
            margin-bottom: 20px;
            text-align: center;
        }

        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }

        .tech-item {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            transition: transform 0.3s ease;
        }

        .tech-item:hover {
            transform: translateY(-5px);
        }

        .tech-item h3 {
            color: #3498db;
            margin-bottom: 10px;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .feature-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
        }

        .feature-card h3 {
            color: #2c3e50;
            margin-bottom: 15px;
        }

        .gallery {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin-bottom: 30px;
        }

        .gallery h2 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 30px;
        }

        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .gallery-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .gallery-item:hover img {
            transform: scale(1.05);
        }

        .gallery-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(44, 62, 80, 0.9);
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 0.9rem;
        }

        .installation {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin-bottom: 30px;
        }

        .installation h2 {
            color: #2c3e50;
            margin-bottom: 20px;
            text-align: center;
        }

        .code-block {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            margin: 15px 0;
            overflow-x: auto;
        }

        .footer {
            text-align: center;
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .tech-grid {
                grid-template-columns: 1fr;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
            
            .gallery-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛍️ Stage App E-Commerce</h1>
            <p>Une application e-commerce complète développée avec les dernières technologies web</p>
        </div>

        <div class="tech-stack">
            <h2>🚀 Technologies Utilisées</h2>
            <div class="tech-grid">
                <div class="tech-item">
                    <h3>Angular 16</h3>
                    <p>Framework frontend moderne</p>
                </div>
                <div class="tech-item">
                    <h3>Node.js & Express.js</h3>
                    <p>Backend robuste et scalable</p>
                </div>
                <div class="tech-item">
                    <h3>MongoDB</h3>
                    <p>Base de données NoSQL</p>
                </div>
                <div class="tech-item">
                    <h3>Angular Material</h3>
                    <p>UI components material design</p>
                </div>
                <div class="tech-item">
                    <h3>Bootstrap</h3>
                    <p>Framework CSS responsive</p>
                </div>
            </div>
        </div>

        <div class="features">
            <div class="feature-card">
                <h3>👥 Interface Client</h3>
                <p>Navigation produits avec filtres avancés</p>
                <p>Panier d'achat dynamique</p>
                <p>Processus de commande sécurisé</p>
                <p>Design responsive</p>
            </div>
            <div class="feature-card">
                <h3>⚙️ Interface Admin</h3>
                <p>Gestion complète des produits</p>
                <p>Suivi des commandes en temps réel</p>
                <p>Tableau de bord analytique</p>
                <p>Gestion des utilisateurs</p>
            </div>
        </div>

        <div class="gallery">
            <h2>📱 Aperçu de l'Application</h2>
            <div class="gallery-grid">
                <div class="gallery-item">
                    <img src="https://github.com/user-attachments/assets/104150ea-892e-4970-b2da-982151e76751" alt="Page d'Accueil" onerror="this.style.display='none'">
                    <div class="gallery-caption">Page d'Accueil</div>
                </div>
                <div class="gallery-item">
                    <img src="https://github.com/user-attachments/assets/b16e9b93-353d-41f7-ae2d-c4f62584e8cf" alt="Page de Login" onerror="this.style.display='none'">
                    <div class="gallery-caption">Page de Connexion</div>
                </div>
                <div class="gallery-item">
                    <img src="https://github.com/user-attachments/assets/641c2177-98c6-485f-8ce8-07b65a35d4a0" alt="Page d'Inscription" onerror="this.style.display='none'">
                    <div class="gallery-caption">Page d'Inscription</div>
                </div>
                <div class="gallery-item">
                    <img src="https://github.com/user-attachments/assets/f34c5cbd-89b7-4857-91a1-08347581787a" alt="Interface Client" onerror="this.style.display='none'">
                    <div class="gallery-caption">Espace Client</div>
                </div>
                <div class="gallery-item">
                    <img src="https://github.com/user-attachments/assets/62b6e401-f08b-4b46-9514-f6ad3003d65f" alt="Dashboard Admin" onerror="this.style.display='none'">
                    <div class="gallery-caption">Dashboard Admin</div>
                </div>
                <div class="gallery-item">
                    <img src="https://github.com/user-attachments/assets/55fe888c-6297-45bf-9238-6d02075c1862" alt="Gestion Produits" onerror="this.style.display='none'">
                    <div class="gallery-caption">Gestion des Produits</div>
                </div>
            </div>
        </div>

        <div class="installation">
            <h2>🛠️ Installation et Démarrage</h2>
            <div class="code-block">
# Installation des dépendances<br>
npm install<br><br>
# Démarrage du serveur backend<br>
npm run server<br><br>
# Démarrage de l'application Angular<br>
ng serve
            </div>
            <p><strong>Ports :</strong> Frontend (4200) | Backend (3000) | MongoDB (27017)</p>
        </div>

        <div class="footer">
            <p><strong>📦 Structure du Projet :</strong> Frontend Angular • Backend Node.js/Express • Base de données MongoDB</p>
            <p>✨ <em>Développé avec Angular 16, Node.js, Express.js et MongoDB</em> ✨</p>
        </div>
    </div>

    <script>
        // Optimisation des images - réduction de la qualité
        document.addEventListener('DOMContentLoaded', function() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                // Ajout d'un loader pour les images
                img.style.background = '#f0f0f0';
                img.style.minHeight = '200px';
                
                // Gestion des erreurs de chargement
                img.onerror = function() {
                    this.alt = 'Image non disponible';
                    this.style.backgroundColor = '#e0e0e0';
                    this.style.display = 'flex';
                    this.style.alignItems = 'center';
                    this.style.justifyContent = 'center';
                    this.style.color = '#666';
                    this.innerHTML = '🖼️ Image non chargée';
                };
            });
        });
    </script>
</body>
</html>
