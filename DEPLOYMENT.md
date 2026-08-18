# Configuration pour GitHub Pages

Ce fichier contient les instructions pour déployer votre portfolio sur GitHub Pages.

## 🚀 Déploiement sur GitHub Pages

### Étapes à suivre :

1. **Créer un repository GitHub**
   ```bash
   # Créer un nouveau repository sur GitHub
   # Nom suggéré : doundiaye98.github.io
   ```

2. **Initialiser Git localement**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio Abdou Ndiaye"
   ```

3. **Connecter au repository distant**
   ```bash
   git remote add origin https://github.com/doundiaye98/doundiaye98.github.io.git
   git branch -M main
   git push -u origin main
   ```

4. **Activer GitHub Pages**
   - Aller dans Settings > Pages
   - Sélectionner "Deploy from a branch"
   - Choisir "main" branch
   - Cliquer "Save"

5. **Accéder à votre portfolio**
   - URL : `https://doundiaye98.github.io`
   - Le site sera disponible en quelques minutes

## 🔧 Configuration avancée

### Domaine personnalisé
Si vous avez un domaine personnalisé :
1. Ajouter un fichier `CNAME` avec votre domaine
2. Configurer les DNS chez votre fournisseur
3. Activer HTTPS dans les paramètres GitHub Pages

### Optimisations SEO
- Ajouter des meta tags dans `index.html`
- Optimiser les images (WebP, compression)
- Ajouter un sitemap.xml
- Configurer Google Analytics

## 📊 Analytics et monitoring

### Google Analytics
```html
<!-- Ajouter dans <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Monitoring des performances
- Utiliser Google PageSpeed Insights
- Configurer Lighthouse CI
- Monitorer Core Web Vitals

## 🔄 Mise à jour continue

### Workflow automatisé
```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 📝 Notes importantes

- GitHub Pages supporte uniquement les sites statiques
- Limite de 1GB par repository
- Bandwidth limité à 100GB/mois
- HTTPS activé par défaut

## 🆘 Support

En cas de problème :
1. Vérifier les logs dans Actions
2. Consulter la documentation GitHub Pages
3. Tester localement avant déploiement
4. Vérifier la syntaxe HTML/CSS/JS

---

**Bon déploiement ! 🚀**
