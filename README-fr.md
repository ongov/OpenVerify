# L’application VérifOuverte

Dépôt du code source libre pour l’application officielle de l’Ontario (VérifOntario) qui est utilisée pour vérifier les certificats de vaccination contre la COVID-19.

- [Aperçu](#aperçu)
- [Configuration locale](#configuration-locale)
- [Règles, clés publiques et version minimale obligatoire de l’application](#règles-clés-publiques-et-version-minimale-obligatoire-de-lapplication)
- [Politique de divulgation des vulnérabilités](#politique-de-divulgation-des-vulnérabilités)

## Aperçu

Il s’agit d’une application de technologie React Native conçue pour être compatible avec les appareils Android et iOS.

VérifOuverte offre aux entreprises et aux organismes un moyen rapide, facile et fiable de numériser les certificats et de vérifier que les visiteurs sont entièrement vaccinés.

L’application numérise le code QR affiché sur un certificat de vaccination délivré par le gouvernement de l’Ontario.

Après avoir numérisé un code QR, l’entreprise ou l’organisme verra : une coche verte indiquant qu’il répond aux exigences en matière de vaccination, un X rouge pour un certificat non valide, ou un avertissement jaune indiquant que le code QR ne peut être lu.

VérifOuverte numérise également la plupart des codes QR des cartes santé SMART® délivrés par le gouvernement. Consultez la liste complète des provinces et territoires de compétence reconnus par l’application à [Ontario.ca/verif](https://ontario.ca/verif).

## Configuration locale

#### 1. Clonez le référentiel

```bash
git clone https://github.com/ongov/OpenVerify
```

#### 2. Installez les dépendances

```bash
cd OpenVerify
yarn install
```

#### 3. Installez les modules

```bash
yarn run update:pods
```

#### 4. Configuration de l’environnement

```bash
cp .env.template .env
```

La variable d’environnement API_URL est dirigée vers l'URL hébergeant les règles, les clés publiques et version minimale obligatoire de l’application. Ajustez la valeur en conséquence.

#### 5. Démarrer l’application (mode développement)

##### iOS

```bash
yarn run ios
```

##### Android

```bash
yarn run android
```

## Règles, clés publiques et version minimale obligatoire de l’application

Ce sont les points de terminaison publics:

[Règles](https://files.ontario.ca/apps/verify/verifyRulesetON.json)

[Clés publiques](https://files.ontario.ca/apps/verify/verifyRulesetON.json)

[Version minimale obligatoire de l’application](https://files.ontario.ca/apps/verify/minimumVersion.json)

## Politique de divulgation des vulnérabilités

[Politique de divulgation des vulnérabilités de VérifOntario | COVID-19 (coronavirus) en Ontario](https://covid-19.ontario.ca/fr/verif-divulgation-vulnerabilite)
