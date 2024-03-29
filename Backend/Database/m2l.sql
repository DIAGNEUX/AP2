-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 25 mars 2024 à 13:50
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `m2l`
--

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `note` int DEFAULT NULL,
  `commentaire` text,
  `utilisateur_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id`, `note`, `commentaire`, `utilisateur_id`) VALUES
(5, 0, 'hdgsqhhj', 34),
(6, 0, 'si je sais', 34),
(7, 45325432, 'Les hwxjwx<schjwjwjx', 34),
(8, 17, 'leo t\'en pense quoi', 34);

-- --------------------------------------------------------

--
-- Structure de la table `commande_produit`
--

DROP TABLE IF EXISTS `commande_produit`;
CREATE TABLE IF NOT EXISTS `commande_produit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commande_id` int DEFAULT NULL,
  `produit_id` int DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `commande_id` (`commande_id`),
  KEY `produit_id` (`produit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande_produit`
--

INSERT INTO `commande_produit` (`id`, `commande_id`, `produit_id`, `quantite`) VALUES
(13, 5, 68, 1),
(14, 5, 2, 1),
(15, 5, 84, 1),
(16, 6, 104, 1),
(17, 6, 44, 1),
(18, 6, 43, 1),
(19, 7, 185, 1),
(20, 7, 84, 1),
(21, 7, 85, 1),
(22, 8, 54, 1),
(23, 8, 85, 1);

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

DROP TABLE IF EXISTS `panier`;
CREATE TABLE IF NOT EXISTS `panier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int DEFAULT NULL,
  `produit_id` int DEFAULT NULL,
  `quantite` int DEFAULT '1',
  `prix` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_panier_produit` (`produit_id`),
  KEY `fk_panier_utilisateur` (`utilisateur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`id`, `utilisateur_id`, `produit_id`, `quantite`, `prix`) VALUES
(109, 35, NULL, 1, NULL),
(111, 35, 39, 2, NULL),
(112, 35, 36, 1, NULL),
(113, 35, 35, 1, NULL),
(114, 35, 38, 1, NULL),
(115, 35, 52, 1, NULL),
(116, 36, NULL, 1, NULL),
(117, 36, 1, 1, NULL),
(118, 36, 2, 2, NULL),
(119, 36, 50, 2, NULL),
(120, 37, NULL, 1, NULL),
(121, 37, 50, 1, NULL),
(122, 37, 68, 2, NULL),
(123, 37, 1, 1, NULL),
(124, 37, 87, 1, NULL),
(125, 37, 81, 1, NULL),
(126, 35, 68, 2, NULL),
(127, 35, 50, 1, NULL),
(128, 36, 68, 1, NULL),
(129, 36, 81, 2, NULL),
(130, 35, 2, 1, NULL),
(131, 35, 86, 1, NULL),
(132, 35, 44, 1, NULL),
(133, 35, 60, 1, NULL),
(135, 39, 50, 2, NULL),
(136, 39, 43, 2, NULL),
(137, 39, 44, 1, NULL),
(138, 39, 2, 1, NULL),
(139, 39, 1, 1, NULL),
(147, 40, 2, 2, 45),
(155, 48, 50, 3, 360),
(156, 48, 43, 2, 120),
(159, 49, 43, 4, 120),
(167, 34, 51, 1, 120),
(168, 34, 50, 1, 120),
(169, 34, 83, 1, 30);

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomProduit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `images` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `description` text NOT NULL,
  `categorie` text NOT NULL,
  `couleur` varchar(255) NOT NULL,
  `taille` varchar(255) NOT NULL,
  `promo` int NOT NULL,
  `cateType` varchar(255) NOT NULL,
  `prix` float NOT NULL,
  `best` varchar(255) NOT NULL,
  `Quantité` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `nomProduit`, `images`, `description`, `categorie`, `couleur`, `taille`, `promo`, `cateType`, `prix`, `best`, `Quantité`) VALUES
(1, '', 'image-1700136110235-Nike Haut de survÃªtement zippÃ© Running Pacer Femme 1.webp,image-1700136110238-Nike Haut de survÃªtement zippÃ© Running Pacer Femme 2.webp,image-1700136110240-Nike Haut de survÃªtement zippÃ© Running Pacer Femme 3.webp,image-1700136110242-Nike Haut de survÃªtement zippÃ© Running Pacer Femme 4.webp,image-1700136110244-Nike Haut de survÃªtement zippÃ© Running Pacer Femme 5.webp', '', '', '', '', 0, '', 0, 'best', 20),
(2, 'Nike Short Challenger 7 ', 'image-1700145953512-Nike Short Challenger 7 orange  Homme 1.webp,image-1700145953515-Nike Short Challenger 7 orange  Homme 2.webp,image-1700145953519-Nike Short Challenger 7 orange  Homme 3.webp,image-1700145953528-Nike Short Challenger 7 orange  Homme 4.webp', '', 'Homme', 'orange', 'XXS ,XS , S , M , L , XL , XXL', 0, 'vêtements', 45, 'best', 22),
(35, 'chaussure copa pure3 terrain souple', 'image-1700228959660-chaussure-copa-pure3-terrain-souple 1.jpg,image-1700228959661-chaussure-copa-pure3-terrain-souple 3.jpg,image-1700228959664-chaussure-copa-pure3-terrain-souple 4.jpg,image-1700228959669-chaussure-copa-pure3-terrain-souple 5.jpg,image-1700228959674-chaussure-copa-pure3-terrain-souple Back.jpg', '', 'Enfant', 'noir', '27 , 28 , 29 , 30 , 31 , 32 , 33 , 34', 0, 'chaussure', 88, '', 20),
(36, 'chaussures de football enfant a scratch 160 easy ', 'image-1700229804928-chaussures-de-football-enfant-a-scratch-160-easy-agfg-rouge 1.jpg,image-1700229804932-chaussures-de-football-enfant-a-scratch-160-easy-agfg-rouge 3.jpg,image-1700229804950-chaussures-de-football-enfant-a-scratch-160-easy-agfg-rouge 4.jpg,image-1700229804974-chaussures-de-football-enfant-a-scratch-160-easy-agfg-rouge 5.jpg,image-1700229805005-chaussures-de-football-enfant-a-scratch-160-easy-agfg-rouge Back.jpg', '', 'Enfant', 'rouge ', '27 , 28 , 29 , 30 , 31 , 32 , 33 , 34', 0, 'chaussure', 110, '', 15),
(37, 'chaussures de football enfant a scratch viralto i easy', 'image-1699966088414-chaussures-de-football-enfant-a-scratch-viralto-i-easy-turf-tf-orange-et-bleu  Front.jpg,image-1699966088417-chaussures-de-football-enfant-a-scratch-viralto-i-easy-turf-tf-orange-et-bleu 3.jpg,image-1699966088433-chaussures-de-football-enfant-a-scratch-viralto-i-easy-turf-tf-orange-et-bleu 4.jpg,image-1699966088449-chaussures-de-football-enfant-a-scratch-viralto-i-easy-turf-tf-orange-et-bleu 5.jpg,image-1699966088468-chaussures-de-football-enfant-a-scratch-viralto-i-easy-turf-tf-orange-et-bleu Back.jpg', '', 'Enfant', 'orange', '27 , 28 , 29 , 30 , 31 , 32 , 33 , 34', 0, 'chaussure', 110, '', 23),
(38, 'chaussures de running enfant adidas ultrabounce noires ', 'image-1699966258486-chaussures-de-running-enfant-adidas-ultrabounce-noires 3.jpg,image-1699966258493-chaussures-de-running-enfant-adidas-ultrabounce-noires 4.jpg,image-1699966258504-chaussures-de-running-enfant-adidas-ultrabounce-noires 5.jpg,image-1699966258523-chaussures-de-running-enfant-adidas-ultrabounce-noires Back.jpg,image-1699966258531-chaussures-de-running-enfant-adidas-ultrabounce-noires Front.jpg', '', 'Enfant', 'noir', '27 , 28 , 29 , 30 , 31 , 32 , 33 , 34', 0, 'chaussure', 100, '', 18),
(39, 'chaussures de running garcon asics gt 1000 bleu 2023 ', 'image-1699966483958-chaussures-de-running-garcon-asics-gel-excite-10-bleu-orange 3.jpg,image-1699966483977-chaussures-de-running-garcon-asics-gel-excite-10-bleu-orange 4.jpg,image-1699966483991-chaussures-de-running-garcon-asics-gel-excite-10-bleu-orange 5.jpg,image-1699966484009-chaussures-de-running-garcon-asics-gel-excite-10-bleu-orange Back.jpg,image-1699966484019-chaussures-de-running-garcon-asics-gel-excite-10-bleu-orange Front.jpg', '', 'Enfant', 'bleu', '27 , 28 , 29 , 30 , 31 , 32 , 33 , 34', 20, 'chaussure', 70, '', 17),
(40, 'Asics GT-1000 Junior', 'image-1700229721991-Asics GT 1000 junior 01.jpg,image-1700229721991-Asics GT 1000 junior 2.webp,image-1700229721995-Asics GT 1000 junior 3.webp,image-1700229721999-Asics GT 1000 junior 4.webp,image-1700229722001-Asics GT 1000 junior 5.webp', '', 'Enfant', 'noir', '27 , 28 , 29 , 30 , 31 , 32 , 33 , 34', 10, 'chaussure', 80, '', 20),
(41, 'reebok-rush-runner-4 ', 'image-1699966769525-reebok-rush-runner-4 3.jpg,image-1699966769534-reebok-rush-runner-4 4.jpg,image-1699966769543-reebok-rush-runner-4 5.jpg,image-1699966769554-reebok-rush-runner-4 Back.jpg,image-1699966769562-reebok-rush-runner-4 Front.jpg', '', 'Enfant', 'noir', '27 , 28 , 29 , 30 , 31 , 32 , 33 , 34', 0, 'chaussure', 60, '', 10),
(42, 'chaussures de running garcon fille adidas duramo ', 'image-1699967282245-chaussures-de-running-garcon-fille-adidas-duramo-sl-enfants-jaune 3.jpg,image-1699967282261-chaussures-de-running-garcon-fille-adidas-duramo-sl-enfants-jaune 4.jpg,image-1699967282279-chaussures-de-running-garcon-fille-adidas-duramo-sl-enfants-jaune 5.jpg', '', 'Enfant', 'jaune', '27 , 28 , 29 , 30 , 31 , 32 , 33 , 34', 0, 'chaussure', 30, '', 15),
(43, 'chaussure de trail running salomon-sense-ride ', 'image-1699967695375-chaussure-de-trail-running-salomon-sense-ride-5-m-grey-red 3.jpg,image-1699967695390-chaussure-de-trail-running-salomon-sense-ride-5-m-grey-red 4.jpg,image-1699967695407-chaussure-de-trail-running-salomon-sense-ride-5-m-grey-red 5.jpg,image-1699967695433-chaussure-de-trail-running-salomon-sense-ride-5-m-grey-red Back.jpg,image-1699967695443-chaussure-de-trail-running-salomon-sense-ride-5-m-grey-red Front.jpg', '', 'Homme', 'rouge', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 120, '', 8),
(44, 'chaussures de trail running man', 'image-1699967827209-chaussures-de-trail-running-man noir 3.jpg,image-1699967827233-chaussures-de-trail-running-man noir 4.jpg,image-1699967827250-chaussures-de-trail-running-man noir 5.jpg,image-1699967827256-chaussures-de-trail-running-man noir Back.jpg,image-1699967827266-chaussures-de-trail-running-man noir Front.jpg', '', 'Homme', 'noir', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 45, 'chaussure', 140, '', 20),
(45, 'chaussures de trail running pour homme race ultra  ', 'image-1699968099553-chaussures-de-trail-running-pour-homme-race-ultra-orange-et-noir 3.jpg,image-1699968099567-chaussures-de-trail-running-pour-homme-race-ultra-orange-et-noir 4.jpg,image-1699968099579-chaussures-de-trail-running-pour-homme-race-ultra-orange-et-noir 5.jpg,image-1699968099592-chaussures-de-trail-running-pour-homme-race-ultra-orange-et-noir Back.jpg,image-1699968099606-chaussures-de-trail-running-pour-homme-race-ultra-orange-et-noir Front.jpg', '', 'Homme', 'orange', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 30, 'chaussure', 150, '', 50),
(48, 'chaussures running homme brooks glycerin 20', 'image-1699968450273-chaussures-running-homme-brooks-glycerin-20-noir-bleu 3.jpg,image-1699968450284-chaussures-running-homme-brooks-glycerin-20-noir-bleu 4.jpg,image-1699968450308-chaussures-running-homme-brooks-glycerin-20-noir-bleu 5.jpg,image-1699968450322-chaussures-running-homme-brooks-glycerin-20-noir-bleu Back.jpg,image-1699968450334-chaussures-running-homme-brooks-glycerin-20-noir-bleu Front.jpg', '', 'Homme', 'noir', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 80, '', 15),
(49, 'chaussures running homme gel pulse 14', 'image-1699968605346-chaussures-running-homme-gel-pulse-14-h-bleu 3.jpg,image-1699968605360-chaussures-running-homme-gel-pulse-14-h-bleu 4.jpg,image-1699968605390-chaussures-running-homme-gel-pulse-14-h-bleu 5.jpg,image-1699968605421-chaussures-running-homme-gel-pulse-14-h-bleu Back.jpg,image-1699968605428-chaussures-running-homme-gel-pulse-14-h-bleu Front.jpg', '', 'Homme', 'bleu', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 95, '', 28),
(50, 'chaussures running homme kiprun', 'image-1700227011275-chaussures-running-homme-kiprun-bleu 1.jpg,image-1700227011281-chaussures-running-homme-kiprun-bleu 3.jpg,image-1700227011286-chaussures-running-homme-kiprun-bleu 4.jpg,image-1700227011295-chaussures-running-homme-kiprun-bleu 5.jpg,image-1700227011302-chaussures-running-homme-kiprun-bleu Back.jpg', '', 'Homme', 'bleu', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 120, 'best', 6),
(51, 'chaussures running homme kiprun', 'image-1700227143109-chaussures-running-homme-kiprun-jaune 1.jpg,image-1700227143116-chaussures-running-homme-kiprun-jaune 3.jpg,image-1700227143119-chaussures-running-homme-kiprun-jaune 4.jpg,image-1700227143127-chaussures-running-homme-kiprun-jaune 5.jpg,image-1700227143132-chaussures-running-homme-kiprun-jaune Back.jpg', '', 'Homme', 'orange', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 120, '', 5),
(52, 'chaussures de running femme kiprun kd 800', 'image-1699969274503-chaussures-de-running-femme-adidas-ultrabounce-pink  Front.jpg,image-1699969274507-chaussures-de-running-femme-adidas-ultrabounce-pink 3.jpg,image-1699969274510-chaussures-de-running-femme-adidas-ultrabounce-pink 4.jpg,image-1699969274515-chaussures-de-running-femme-adidas-ultrabounce-pink 5.jpg,image-1699969274521-chaussures-de-running-femme-adidas-ultrabounce-pink Back.jpg', '', 'Femme', 'rose', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 20, 'chaussure', 80, '', 10),
(53, 'chaussures de running femme kiprun ks 900', 'image-1700228445899-chaussures-de-running-femme-kiprun-ks900-jaune 1.jpg,image-1700228445905-chaussures-de-running-femme-kiprun-ks900-jaune 3.jpg,image-1700228445911-chaussures-de-running-femme-kiprun-ks900-jaune 4.jpg,image-1700228445918-chaussures-de-running-femme-kiprun-ks900-jaune 5.jpg,image-1700228445925-chaussures-de-running-femme-kiprun-ks900-jaune Back.jpg', '', 'Femme', 'jaune', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 140, '', 20),
(54, 'chaussures de running femme kiprun kd 800', 'image-1700228479076-chaussures-de-running-femme-kiprun-kd-800-vert-rose 1.jpg,image-1700228479081-chaussures-de-running-femme-kiprun-kd-800-vert-rose 3.jpg,image-1700228479085-chaussures-de-running-femme-kiprun-kd-800-vert-rose 4.jpg,image-1700228479100-chaussures-de-running-femme-kiprun-kd-800-vert-rose 5.jpg,image-1700228479109-chaussures-de-running-femme-kiprun-kd-800-vert-rose Back.jpg', '', 'Femme', 'rose', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 110, '', 12),
(55, 'chaussures de running femme kiprun ks900', 'image-1700228491389-chaussures-de-running-femme-kiprun-ks900-mauve 1.jpg,image-1700228491392-chaussures-de-running-femme-kiprun-ks900-mauve 4.jpg,image-1700228491400-chaussures-de-running-femme-kiprun-ks900-mauve 5 (2).jpg,image-1700228491405-chaussures-de-running-femme-kiprun-ks900-mauve 5.jpg,image-1700228491412-chaussures-de-running-femme-kiprun-ks900-mauve Back.jpg', '', 'Femme', 'mauve', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 120, '', 30),
(56, 'chaussures de running femme kiprun ks900', 'image-1700228505854-chaussures-de-running-femme-kiprun-ks900-noir-rose 1.jpg,image-1700228505858-chaussures-de-running-femme-kiprun-ks900-noir-rose 3.jpg,image-1700228505862-chaussures-de-running-femme-kiprun-ks900-noir-rose 4.jpg,image-1700228505874-chaussures-de-running-femme-kiprun-ks900-noir-rose 5.jpg,image-1700228505877-chaussures-de-running-femme-kiprun-ks900-noir-rose Back.jpg', '', 'Femme', 'noir', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 120, '', 20),
(57, 'chaussures de running femme kiprun ks900', 'image-1700228524327-chaussures-de-running-femme-kiprun-ks900-vert 1.jpg,image-1700228524329-chaussures-de-running-femme-kiprun-ks900-vert 3.jpg,image-1700228524335-chaussures-de-running-femme-kiprun-ks900-vert 4.jpg,image-1700228524339-chaussures-de-running-femme-kiprun-ks900-vert 5.jpg,image-1700228524346-chaussures-de-running-femme-kiprun-ks900-vert Back.jpg', '', 'Femme', 'vert', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 120, '', 5),
(58, 'chaussures running femme kiprun kd800', 'image-1700228619058-chaussures-running-femme-kiprun-kd800-blanc-rose-bleu 1.jpg,image-1700228619063-chaussures-running-femme-kiprun-kd800-blanc-rose-bleu 2.jpg,image-1700228619069-chaussures-running-femme-kiprun-kd800-blanc-rose-bleu 4.jpg,image-1700228619081-chaussures-running-femme-kiprun-kd800-blanc-rose-bleu 5.jpg,image-1700228619086-chaussures-running-femme-kiprun-kd800-blanc-rose-bleu Back.jpg', '', 'Femme', 'blanc', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 120, '', 3),
(59, 'chaussures running femme new balance propel v4', 'image-1700228778628-chaussures-running-femme-new-balance-propel-v4-blanc-violet 1.jpg,image-1700228778636-chaussures-running-femme-new-balance-propel-v4-blanc-violet 3.jpg,image-1700228778646-chaussures-running-femme-new-balance-propel-v4-blanc-violet 4.jpg,image-1700228778665-chaussures-running-femme-new-balance-propel-v4-blanc-violet 5.jpg,image-1700228778672-chaussures-running-femme-new-balance-propel-v4-blanc-violet Back.jpg', '', 'Femme', 'blanc', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 20, 'chaussure', 100, '', 10),
(60, 'chaussures running femme new balance propel v4', 'image-1700228653390-chaussures-running-femme-new-balance-propel-v4-rouge-fluo 1.jpg,image-1700228653393-chaussures-running-femme-new-balance-propel-v4-rouge-fluo 3.jpg,image-1700228653398-chaussures-running-femme-new-balance-propel-v4-rouge-fluo 4.jpg,image-1700228653402-chaussures-running-femme-new-balance-propel-v4-rouge-fluo 5.jpg,image-1700228653407-chaussures-running-femme-new-balance-propel-v4-rouge-fluo Back.jpg', '', 'Femme', 'orange', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 20, 'chaussure', 120, '', 7),
(61, 'chaussures running femme saucony ride 16 ', 'image-1700228685999-chaussures-running-femme-saucony-ride-16-blanche-bleue 1.jpg,image-1700228686002-chaussures-running-femme-saucony-ride-16-blanche-bleue 3.jpg,image-1700228686010-chaussures-running-femme-saucony-ride-16-blanche-bleue 4.jpg,image-1700228686022-chaussures-running-femme-saucony-ride-16-blanche-bleue 5.jpg,image-1700228686030-chaussures-running-femme-saucony-ride-16-blanche-bleue Back.jpg', '', 'Femme', 'blanc', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 90, '', 8),
(62, 'chaussures de running femme saucony ride 16', 'image-1700228819081-chaussures-running-femme-saucony-ride-16-verte 1.jpg,image-1700228819088-chaussures-running-femme-saucony-ride-16-verte 3.jpg,image-1700228819106-chaussures-running-femme-saucony-ride-16-verte 4.jpg,image-1700228819117-chaussures-running-femme-saucony-ride-16-verte 5.jpg,image-1700228819124-chaussures-running-femme-saucony-ride-16-verte Back.jpg', '', 'Femme', 'vert', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 35, 'chaussure', 100, '', 16),
(63, 'chaussures running homme kiprun', 'image-1700226528384-chaussures-running-homme-kiprun-orange 1.jpg,image-1700226528390-chaussures-running-homme-kiprun-orange 3.jpg,image-1700226528396-chaussures-running-homme-kiprun-orange 4.jpg,image-1700226528414-chaussures-running-homme-kiprun-orange 5.jpg,image-1700226528436-chaussures-running-homme-kiprun-orange Back.jpg', '', 'Homme', 'orange', '39 , 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 120, '', 30),
(67, 'Nike Haut de survêtement zippé Running Pacer Femme  ', 'image-1700136538276-Nike Haut de survÃªtement zippÃ© Running Pacer Femme jaune 1.webp,image-1700136538280-Nike Haut de survÃªtement zippÃ© Running Pacer Femme jaune 2.webp,image-1700136538286-Nike Haut de survÃªtement zippÃ© Running Pacer Femme jaune 3.webp,image-1700136538288-Nike Haut de survÃªtement zippÃ© Running Pacer Femme jaune 4.webp,image-1700136538294-Nike Haut de survÃªtement zippÃ© Running Pacer Femme jaune 5.webp', '', 'Femme', 'jaune', 'XXS ,XS , S , M , L , XL , XXL', 0, 'vêtements', 55, '', 21),
(68, 'Define Halter Neck Bra ', 'image-1700136662850-Define_HalterNeckBra_Black_01_800x  1.webp,image-1700136662851-Define_HalterNeckBra_Black_02_800x 2.webp,image-1700136662857-Define_HalterNeckBra_Black_03_800x 3.webp,image-1700136662859-Define_HalterNeckBra_Black_05_800x 4.webp,image-1700136662864-Define_HalterNeckBra_Black_06_800x 5.webp', '', 'Femme', 'noir', 'XXS ,XS , S , M , L , XL , XXL', 0, 'vêtements', 46, 'best', 8),
(69, 'Define Halter Neck Bra', 'image-1700136774992-Define_HalterNeckBra_DarkCherry_01_800x.webp,image-1700136774992-Define_HalterNeckBra_DarkCherry_02_800x.webp,image-1700136774993-Define_HalterNeckBra_DarkCherry_03_800x.webp,image-1700136774994-Define_HalterNeckBra_DarkCherry_05_800x.webp,image-1700136774999-Define_HalterNeckBra_DarkCherry_06_800x.webp', '', 'Femme', 'rouge', 'XXS ,XS , S , M , L , XL , XXL ', 0, 'vêtements', 46, '', 8),
(71, 'Define Halter Neck Bra', 'image-1700136990202-Define_HalterNeckBra_SmokeBlue_01_800x 1.webp,image-1700136990203-Define_HalterNeckBra_SmokeBlue_02_800x 2.webp,image-1700136990206-Define_HalterNeckBra_SmokeBlue_03_800x 3.webp,image-1700136990207-Define_HalterNeckBra_SmokeBlue_05_800x 5.webp,image-1700136990211-Define_HalterNeckBra_SmokeBlue_06_800x 4.webp', '', 'Femme', '', 'XXS ,XS , S , M , L , XL , XXL ', 0, 'vêtements', 46, '', 15),
(72, 'Define Halter Neck Bra', 'image-1700137248609-Define_HalterNeckBra_SapphireBlue_01_800x 1.webp,image-1700137248609-Define_HalterNeckBra_SapphireBlue_02_800x 2.webp,image-1700137248612-Define_HalterNeckBra_SapphireBlue_03_800x 3.webp,image-1700137248613-Define_HalterNeckBra_SapphireBlue_05_800x4.webp,image-1700137248616-Define_HalterNeckBra_SapphireBlue_06_800x5.webp', '', 'Femme', 'bleu', 'XXS ,XS , S , M , L , XL , XXL ', 0, 'vêtements', 46, '', 20),
(73, 'adidas Legging Optime Power ', 'image-1700137409243-adidas Legging Optime Power  1.webp,image-1700137409246-adidas Legging Optime Power 2.webp,image-1700137409250-adidas Legging Optime Power 3.webp,image-1700137409258-adidas Legging Optime Power 4.webp', '', 'Femme', 'orange', 'XXS ,XS , S , M , L , XL , XXL ', 0, 'vêtements', 25, '', 19),
(74, 'adidas Legging Optime Power black ', 'image-1700137506061-adidas Legging Optime Power black 1.webp,image-1700137506064-adidas Legging Optime Power black 2.webp,image-1700137506067-adidas Legging Optime Power black 3.webp,image-1700137506070-adidas Legging Optime Power black 5.webp', '', 'Femme', 'noir', 'XXS ,XS , S , M , L , XL , XXL ', 0, 'vêtements', 25, '', 20),
(75, 'adidas Legging Optime Power ', 'image-1700137697509-adidas Legging Optime Power marron 1.webp,image-1700137697513-adidas Legging Optime Power marron 2.webp,image-1700137697521-adidas Legging Optime Power marron 3.webp,image-1700137697541-adidas Legging Optime Power marron 4.webp,image-1700137697545-adidas Legging Optime Power marron 5.webp', '', 'Femme', 'marron', 'XXS ,XS , S , M , L , XL , XXL ', 0, 'vêtements', 25, '', 10),
(76, 'adidas Legging Optime Power', 'image-1700137804327-adidas Legging Optime Training 1.webp,image-1700137804329-adidas Legging Optime Training 2.webp,image-1700137804332-adidas Legging Optime Training 3.webp,image-1700137804338-adidas Legging Optime Training 4.webp', '', 'Femme', 'violet', 'XXS ,XS , S , M , L , XL , XXL ', 0, 'vêtements', 25, '', 24),
(77, 'Camo Bra', 'image-1700137913494-Camo_Bra_Black_01_800x.webp,image-1700137913496-Camo_Bra_Black_02_800x Back.webp,image-1700137913504-Camo_Bra_Black_03_800x 3.webp,image-1700137913505-Camo_Bra_Black_04_800x 4.webp,image-1700137913511-Camo_Bra_Black_06_800x 5.webp', '', 'Femme', 'tigre', 'XXS ,XS , S , M , L , XL , XXL ', 0, 'vêtements', 46, '', 4),
(78, 'Camo Bra', 'image-1700137981132-Camo_Bra_Green_01_800x.webp,image-1700137981132-Camo_Bra_Green_02_800x.webp,image-1700137981137-Camo_Bra_Green_03_800x 4.webp,image-1700137981139-Camo_Bra_Green_04_800x 3.webp,image-1700137981145-Camo_Bra_Green_06_800x 5.webp', '', 'Femme', 'tigre', 'XXS ,XS , S , M , L , XL , XXL   ', 0, 'vêtements', 46, '', 43),
(79, 'Nike Training Pro Shine Tights ', 'image-1700138095411-Nike Training Pro Shine Tights 1.webp,image-1700138095414-Nike Training Pro Shine Tights 2.webp,image-1700138095416-Nike Training Pro Shine Tights 3.webp,image-1700138095420-Nike Training Pro Shine Tights 4.webp', '', 'Femme', 'noir', 'XXS ,XS , S , M , L , XL , XXL', 0, 'vêtements', 55, '', 21),
(80, 'Under Armour Brassière de Sport Infinity Light Support', 'image-1700138179791-Under Armour BrassiÃ¨re de Sport Infinity Light Support Femme 1.webp,image-1700138179797-Under Armour BrassiÃ¨re de Sport Infinity Light Support Femme 2.webp,image-1700138179806-Under Armour BrassiÃ¨re de Sport Infinity Light Support Femme 3.webp,image-1700138179811-Under Armour BrassiÃ¨re de Sport Infinity Light Support Femme 4.webp', '', 'Femme', 'violet', 'XXS ,XS , S , M , L , XL , XXL ', 0, 'vêtements', 38, '', 12),
(81, 'Under Armour Shirt manches longues zip Tech ', 'image-1700138269185-Under Armour Shirt manches longues zip Tech Evolved Core 1.webp,image-1700138269191-Under Armour Shirt manches longues zip Tech Evolved Core 2.webp,image-1700138269198-Under Armour Shirt manches longues zip Tech Evolved Core 3.webp,image-1700138269203-Under Armour Shirt manches longues zip Tech Evolved Core 4.webp,image-1700138269211-Under Armour Shirt manches longues zip Tech Evolved Core 5.webp', '', 'Femme', 'rose', 'XXS ,XS , S , M , L , XL , XXL', 0, 'vêtements', 45, 'best', 20),
(83, 'Under Armour Haut Zippé Tech Homme', 'image-1700141869718-Under Armour Haut ZippÃ© Tech Homme 1.webp,image-1700141869720-Under Armour Haut ZippÃ© Tech Homme 2.webp,image-1700141869725-Under Armour Haut ZippÃ© Tech Homme 3.webp,image-1700141869727-Under Armour Haut ZippÃ© Tech Homme 4.webp,image-1700141869730-Under Armour Haut ZippÃ© Tech Homme 5.webp', '', 'Homme', 'bleu', 'XXS ,XS , S , M , L , XL , XXL', 0, 'vêtements', 30, '', 15),
(84, 'Under Armour Haut Zippé Tech Homme', 'image-1700141986258-Under Armour Haut ZippÃ© Tech Rouge Homme 1.webp,image-1700141986262-Under Armour Haut ZippÃ© Tech Rouge Homme 2.webp,image-1700141986264-Under Armour Haut ZippÃ© Tech Rouge Homme 3.webp,image-1700141986267-Under Armour Haut ZippÃ© Tech Rouge Homme 4.webp', '', 'Homme', 'rouge', 'XXS ,XS , S , M , L , XL , XXL', 35, 'vêtements', 45, '', 25),
(85, 'Under Armour Haut Zippé Tech Homme', 'image-1700142068278-Under Armour Haut ZippÃ© Tech Vert Homme 1.webp,image-1700142068281-Under Armour Haut ZippÃ© Tech Vert Homme 2.webp,image-1700142068286-Under Armour Haut ZippÃ© Tech Vert Homme 3.webp,image-1700142068287-Under Armour Haut ZippÃ© Tech Vert Homme 4.webp', '', 'Homme', 'vert', 'XXS ,XS , S , M , L , XL , XXL', 0, 'vêtements', 45, '', 4),
(87, 'Nike T-shirt Rise 365 Homme', 'image-1700142505673-Nike T-shirt Rise 365 Homme 1.webp,image-1700142505678-Nike T-shirt Rise 365 Homme 2.webp,image-1700142505689-Nike T-shirt Rise 365 Homme 3.webp,image-1700142505699-Nike T-shirt Rise 365 Homme 4.webp,image-1700142505706-Nike T-shirt Rise 365 Homme 5.webp', '', 'Homme', 'vert', 'XXS ,XS , S , M , L , XL , XXL', 0, 'vêtements', 38, 'best', 40),
(88, 'Nike T-shirt Rise 365 Homme', 'image-1700142609393-Nike T-shirt Rise 365 noir Homme 1.webp,image-1700142609396-Nike T-shirt Rise 365 noir Homme 2.webp,image-1700142609402-Nike T-shirt Rise 365 noir Homme 3.webp,image-1700142609404-Nike T-shirt Rise 365 noir Homme 4.webp', '', 'Homme', 'noir', 'XXS ,XS , S , M , L , XL , XXL', 25, 'vêtements', 38, '', 30),
(89, 'Nike T-shirt Rise 365 Homme', 'image-1700145655656-Nike T-shirt Rise 365 gris Homme 1.webp,image-1700145655663-Nike T-shirt Rise 365 gris Homme 2.webp,image-1700145655669-Nike T-shirt Rise 365 gris Homme 3.webp,image-1700145655674-Nike T-shirt Rise 365 gris Homme 4.webp,image-1700145655679-Nike T-shirt Rise 365 gris Homme 5.webp', '', 'Homme', 'gris', 'XXS ,XS , S , M , L , XL , XXL', 0, 'vêtements', 30, '', 13),
(91, 'Nike Short Challenger 7', 'image-1700146066499-Nike Short Challenger 7 Homme 1.webp,image-1700146066502-Nike Short Challenger 7 Homme 2.webp,image-1700146066508-Nike Short Challenger 7 Homme 3.webp,image-1700146066510-Nike Short Challenger 7 Homme 7.webp,image-1700146066514-Nike Short Challenger 7 Homme4.webp', '', 'Homme', 'noir', 'XXS ,XS , S , M , L , XL , XXL', 25, 'vêtements', 45, '', 14),
(92, 'Nike Short Challenger 7', 'image-1700146159488-Nike Short Challenger 7 gris  Homme 1.webp,image-1700146159489-Nike Short Challenger 7 gris  Homme 2.webp,image-1700146159496-Nike Short Challenger 7 gris  Homme 3.webp,image-1700146159501-Nike Short Challenger 7 gris  Homme 4.webp,image-1700146159504-Nike Short Challenger 7 gris  Homme 5.webp', '', 'Homme', 'gris', 'XXS ,XS , S , M , L , XL , XXL ', 25, 'vêtements', 45, '', 21),
(93, 'Nike Academy Essential Track Pants', 'image-1700146275128-Nike Academy Essential Track Pants 1.webp,image-1700146275129-Nike Academy Essential Track Pants 2.webp,image-1700146275133-Nike Academy Essential Track Pants 3.webp,image-1700146275143-Nike Academy Essential Track Pants 4.webp', '', 'Homme', 'noir', 'XXS ,XS , S , M , L , XL , XXL ', 0, 'vêtements', 48, '', 18),
(94, 'Nike Academy Essential Track Pants', 'image-1700146387089-Nike Academy Essential Track beige Pants 1.webp,image-1700146387091-Nike Academy Essential Track beige Pants 2.webp,image-1700146387096-Nike Academy Essential Track beige Pants 3.webp,image-1700146387099-Nike Academy Essential Track beige Pants 4.webp,image-1700146387108-Nike Academy Essential Track beige Pants 5.webp', '', 'Homme', 'beige', 'XXS ,XS , S , M , L , XL , XXL', 35, 'vêtements', 45, '', 10),
(95, 'Nike Ensemble de survêtement Academy 23 Junior', 'image-1700147144237-Nike Ensemble de survÃªtement Academy 23 Junior 1.webp,image-1700147144238-Nike Ensemble de survÃªtement Academy 23 Junior 2.webp,image-1700147144239-Nike Ensemble de survÃªtement Academy 23 Junior 3.webp,image-1700147144244-Nike Ensemble de survÃªtement Academy 23 Junior 4.webp,image-1700147144245-Nike Ensemble de survÃªtement Academy 23 Junior 5.webp', '', 'Enfant', 'noir', '7-8 ,8-10 , 10-12 , 12-13 , 13-15 ', 0, 'vêtements', 65, '', 15),
(96, 'Nike Ensemble de survêtement Academy 23 Junior', 'image-1700147218824-Nike Ensemble de survÃªtement Academy 23 bleu Junior 1.webp,image-1700147218824-Nike Ensemble de survÃªtement Academy 23 bleu Junior 2.webp,image-1700147218825-Nike Ensemble de survÃªtement Academy 23 bleu Junior 3.webp,image-1700147218830-Nike Ensemble de survÃªtement Academy 23 bleu Junior 4.webp,image-1700147218834-Nike Ensemble de survÃªtement Academy 23 bleu Junior 5.webp', '', 'Enfant', 'bleu', '7-8 ,8-10 , 10-12 , 12-13 , 13-15 ', 0, 'vêtements', 65, '', 21),
(97, 'Nike Haut d\'entraînement Academy 23 Junior', 'image-1700147349047-Nike Haut d\'entraÃ®nement Academy 23 gris Junior 1.webp,image-1700147349053-Nike Haut d\'entraÃ®nement Academy 23 gris Junior 2.webp,image-1700147349061-Nike Haut d\'entraÃ®nement Academy 23 gris Junior 3.webp,image-1700147349063-Nike Haut d\'entraÃ®nement Academy 23 gris Junior 4.webp,image-1700147349078-Nike Haut d\'entraÃ®nement Academy 23 gris Junior 5.webp', '', 'Enfant', 'gris', '7-8 ,8-10 , 10-12 , 12-13 , 13-15 ', 0, 'vêtements', 38, '', 24),
(98, 'Nike Haut d\'entraînement Academy 23 Junior', 'image-1700147446150-Nike Haut d\'entraÃ®nement Academy 23 Junior 1.webp,image-1700147446157-Nike Haut d\'entraÃ®nement Academy 23 Junior 2.webp,image-1700147446161-Nike Haut d\'entraÃ®nement Academy 23 Junior 3.webp,image-1700147446166-Nike Haut d\'entraÃ®nement Academy 23 Junior 4.webp,image-1700147446175-Nike Haut d\'entraÃ®nement Academy 23 Junior 5.webp', '', 'Enfant', 'bleu', '7-8 ,8-10 , 10-12 , 12-13 , 13-15 ', 0, 'vêtements', 38, '', 13),
(99, 'Nike Haut d\'entraînement Academy 23 Junior', 'image-1700147565883-Nike Haut d\'entraÃ®nement Academy 23 noir Junior 5.webp,image-1700147565883-Nike Haut d\'entraÃ®nement Academy 23 noir Junior 1.webp,image-1700147565893-Nike Haut d\'entraÃ®nement Academy 23 noir Junior 2.webp,image-1700147565897-Nike Haut d\'entraÃ®nement Academy 23 noir Junior 3.webp,image-1700147565903-Nike Haut d\'entraÃ®nement Academy 23 noir Junior 4.webp', '', 'Enfant', 'noir', '7-8 ,8-10 , 10-12 , 12-13 , 13-15 ', 0, 'vêtements', 38, '', 3),
(100, 'Nike T-shirt Fitness One Junior', 'image-1700147692403-Nike T-shirt Fitness One Junior  1.webp,image-1700147692408-Nike T-shirt Fitness One Junior 2.webp,image-1700147692412-Nike T-shirt Fitness One Junior 3.webp,image-1700147692419-Nike T-shirt Fitness One Junior 4.webp,image-1700147692425-Nike T-shirt Fitness One Junior 5.webp', '', 'Enfant', 'rose', '7-8 ,8-10 , 10-12 , 12-13 , 13-15 ', 0, 'vêtements', 28, '', 2),
(102, 'Nike T-Shirt Miler Junior', 'image-1700147914266-Nike T-Shirt Miler Junior 1.webp,image-1700147914270-Nike T-Shirt Miler Junior 2.webp,image-1700147914273-Nike T-Shirt Miler Junior 3.webp,image-1700147914282-Nike T-Shirt Miler Junior 4.webp,image-1700147914284-Nike T-Shirt Miler Junior 5.webp', '', 'Enfant', 'bleu', '7-8 ,8-10 , 10-12 , 12-13 , 13-15 ', 0, 'vêtements', 22, '', 3),
(103, 'Nike T-Shirt Miler Junior', 'image-1700148068694-Nike T-Shirt Miler noir Junior 1.webp,image-1700148068697-Nike T-Shirt Miler noir Junior 3.webp,image-1700148068699-Nike T-Shirt Miler noir Junior 4.webp,image-1700148068703-Nike T-Shirt Miler noir Junior 5.webp,image-1700148068705-Nike T-Shirt Miler noir Junior Back.webp', '', 'Enfant', 'noir', '7-8 ,8-10 , 10-12 , 12-13 , 13-15 ', 0, 'vêtements', 22, '', 20),
(104, 'chaussures de trail running man', 'image-1700224285880-chaussures-de-trail-running-pour-man 1.jpg,image-1700224285887-chaussures-de-trail-running-pour-man 2.jpg,image-1700224285892-chaussures-de-trail-running-pour-man 3.jpg,image-1700224285899-chaussures-de-trail-running-pour-man 4.jpg,image-1700224285915-chaussures-de-trail-running-pour-man 5.jpg', '', 'Homme', 'gris', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 120, '', 0),
(180, 'chaussures de trail running man', 'image-1700227284457-chaussures-de-trail-running-man white 1.jpg,image-1700227284459-chaussures-de-trail-running-man white 3.jpg,image-1700227284463-chaussures-de-trail-running-man white 4.jpg,image-1700227284465-chaussures-de-trail-running-man white 5.jpg,image-1700227284468-chaussures-de-trail-running-man white Back.jpg', '', 'Homme', 'blanc', '39, 40 , 41 , 42 , 43 , 44 , 45 , 46', 0, 'chaussure', 110, '', 15),
(181, 'Under Armour Haut Zippé Tech Homme', 'image-1701258049515-Under Armour Haut ZippÃ© Tech Homme vert 1.webp,image-1701258049519-Under Armour Haut ZippÃ© Tech Homme vert 2.webp,image-1701258049526-Under Armour Haut ZippÃ© Tech Homme vert 3.webp,image-1701258049527-Under Armour Haut ZippÃ© Tech Homme vert 4.webp,image-1701258049531-Under Armour Haut ZippÃ© Tech Homme vert 5.webp', '', 'Homme', 'vert', 'XXS ,XS , S , M , L , XL , XXL', 0, 'vetements', 45, '', 17),
(185, 'Under Armour Haut Zippé Tech Homme', 'image-1708938960593-Under Armour Haut ZippÃ© Tech Homme 1.webp,image-1708938960596-Under Armour Haut ZippÃ© Tech Homme 2.webp,image-1708938960600-Under Armour Haut ZippÃ© Tech Homme 3.webp,image-1708938960601-Under Armour Haut ZippÃ© Tech Homme 4.webp,image-1708938960602-Under Armour Haut ZippÃ© Tech Homme 5.webp', '', 'Homme', 'orange', 'XXS ,XS , S , M , L , XL , XXL', 15, 'vêtements', 45, '', 0);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `nom`, `prenom`, `email`, `mdp`, `role`) VALUES
(34, 'leo', 'leo', 'leo', '$2a$10$5SzhR6jy56.YOtbKlQVBEO.7K380bdvpR5q0rhPME61f855VyQISq', 0),
(35, 'test', 'test', 'test', '$2a$10$SAbM.DdfO7ZB1qXSUx.EjOmce7.jJeAeYl0zeXJ82SqXQRPpt9FTu', 0),
(36, 'mame', 'mame', 'mame', '$2a$10$21If4a7rOY4Ow9ccggXkOO4fGCneqieEVHLY3Is1Q5vaqU80poBGK', 1),
(37, 'a', 'a', 'a', '$2a$10$5VeFqdTUuVW.NHcZznUr9uGP7y2IIDXR9UTde.XgCL2RxAqIlP.3m', 0),
(38, 'alioune', 'alioune', 'alioune', '$2a$10$xV36yhqtVq9cbOa1qGE1mOtDxEPhv8nTcfyAflN4dPEbgr53W0wX.', 0),
(39, 'mar', 'mar', 'mar', '$2a$10$Vgl.eDOHA5JfbUfrgBQDbuywdgakcBn6ZSqpa..1Sg.6Lx8YVpmgK', 0),
(40, 'c', 'c', 'c', '$2a$10$tURCEdy0Sj4WwP5lJV783.HFwW7Yxe.OA7z3OWXlXNqrQ629ESCzu', 0),
(41, 'mama', 'mama', 'mama', '$2a$10$9Jnncw5sdsOJcjtU11QgeuqJiWEZDL3OOG.Yu4Ea76W3bLMJPYPWK', 0),
(42, 'raf', 'raf', 'raf', '$2a$10$UFgAxmEfToxBfI.OmO1LS.cK1BeD5TO1Ty6eXaVuwqQ0vIUmshBXa', 0),
(43, 'mai', 'mai', 'mai', '$2b$10$Y6fS/EnlYlgsqgzSnQMqUuL/5RPsFAvIjNwFZgCAHhE6OS7ahDhxa', 1),
(44, 'cr', 'cr', 'cr', '$2b$10$95aSgpraoLvE4uMmYQLWMurbBcFIFvRJ81ejmF4r83frr.YXhezj.', 0),
(47, 'lo', 'lo', 'lo', '$2a$10$hghnkUTWw8TlVapsoSnaDeBXuJrhV5RyNIrMFnkxxmr0RmUfdO13u', 1),
(48, 'bon', 'bon', 'bon', '$2a$10$4.hPgZNgMQVCwiku/CLhE.IB4KoyOIsGlFUSxez0C8seovzg1GJB.', 0),
(49, 'christian', 'christian', 'christian', '$2a$10$8PuDkBeYPFvzWAGuHJ0RF.8biLhp4hV5Gxr65PzcQ/tD38zbA8prq', 0),
(50, 'diagne', 'Alioune', 'alioune', '$2a$10$fAwdwe88QmCCgwzCVLPrw.5VMzeTKaznMWaVgWd3ceLZKfXfbE.BG', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `fk_panier_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
