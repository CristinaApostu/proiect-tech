SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

CREATE DATABASE `lista_carti` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE lista_carti;



CREATE TABLE IF NOT EXISTS `categories`
(
`id` INTEGER NOT NULL,
`denumire` varchar(50),
`descriere` varchar(100),
`createdAt` timestamp,
`updatedAt` timestamp,
PRIMARY KEY(`id`),
KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;



CREATE TABLE IF NOT EXISTS `books`
(
`id` INTEGER NOT NULL auto_increment,
`id_categorie` INTEGER,
`titlu_carte` VARCHAR(35),
`autor` VARCHAR(30),
`descriere_carte` VARCHAR(100),
`imagine_carte` VARCHAR(200),
`createdAt` timestamp,
`updatedAt` timestamp,
PRIMARY KEY(`id`),
FOREIGN KEY(`id_categorie`) REFERENCES categories(`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
