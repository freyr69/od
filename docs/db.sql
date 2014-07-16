-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 16, 2014 at 04:34 AM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

use `od`;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `od`
--

-- --------------------------------------------------------

--
-- Table structure for table `arousals`
--

CREATE TABLE `arousals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `arousals`
--

INSERT INTO `arousals` (`id`, `date`, `level`, `createdAt`, `updatedAt`) VALUES
(1, '2014-06-22 19:01:13', 3, '2014-06-22 19:01:13', '2014-06-22 19:01:13'),
(2, '2014-06-22 19:15:05', 5, '2014-06-22 19:15:05', '2014-06-22 19:15:05'),
(3, '2014-06-29 13:20:27', 4, '2014-06-29 13:20:27', '2014-06-29 13:20:27'),
(4, '2014-06-29 16:42:47', 2, '2014-06-29 16:42:47', '2014-06-29 16:42:47'),
(5, '2014-06-30 01:45:08', 3, '2014-06-30 01:45:08', '2014-06-30 01:45:08'),
(6, '2014-07-06 19:47:14', 2, '2014-07-06 19:47:14', '2014-07-06 19:47:14');

-- --------------------------------------------------------

--
-- Table structure for table `chastityLogs`
--

CREATE TABLE `chastityLogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `chastityLogs`
--

INSERT INTO `chastityLogs` (`id`, `start`, `end`, `createdAt`, `updatedAt`) VALUES
(1, '2014-06-22 19:39:12', '2014-06-22 19:45:32', '2014-06-22 19:39:12', '2014-06-22 19:45:32'),
(2, '2014-06-29 13:18:23', '2014-07-06 19:47:09', '2014-06-29 13:18:23', '2014-07-06 19:47:09');

-- --------------------------------------------------------

--
-- Table structure for table `orgasmLogs`
--

CREATE TABLE `orgasmLogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=51 ;

--
-- Dumping data for table `orgasmLogs`
--

INSERT INTO `orgasmLogs` (`id`, `type`, `date`, `createdAt`, `updatedAt`) VALUES
(1, 3, '2014-04-24 22:46:00', '2014-06-08 20:38:27', '2014-06-08 20:38:27'),
(2, 1, '2014-05-03 18:04:00', '2014-06-08 20:38:27', '2014-06-08 20:38:27'),
(3, 3, '2014-05-04 14:11:00', '2014-06-08 20:39:18', '2014-06-08 20:39:18'),
(4, 3, '2014-05-05 14:11:00', '2014-06-08 20:39:18', '2014-06-08 20:39:18'),
(5, 3, '2014-05-25 22:23:00', '2014-06-08 20:39:51', '2014-06-08 20:39:51'),
(6, 2, '2014-06-29 13:51:20', '2014-06-29 13:51:20', '2014-06-29 13:51:20'),
(7, 2, '2014-06-29 13:53:00', '2014-06-29 13:53:00', '2014-06-29 13:53:00'),
(8, 2, '2014-06-29 13:54:28', '2014-06-29 13:54:28', '2014-06-29 13:54:28'),
(9, 1, '2014-06-29 14:07:16', '2014-06-29 14:07:16', '2014-06-29 14:07:16'),
(10, 3, '2014-06-29 14:08:13', '2014-06-29 14:08:13', '2014-06-29 14:08:13'),
(11, 1, '2014-06-29 14:08:27', '2014-06-29 14:08:27', '2014-06-29 14:08:27'),
(12, 1, '2014-06-29 14:08:29', '2014-06-29 14:08:29', '2014-06-29 14:08:29'),
(13, 1, '2014-06-29 14:08:30', '2014-06-29 14:08:30', '2014-06-29 14:08:30'),
(14, 1, '2014-06-29 14:08:32', '2014-06-29 14:08:32', '2014-06-29 14:08:32'),
(15, 1, '2014-06-29 14:08:33', '2014-06-29 14:08:33', '2014-06-29 14:08:33'),
(16, 1, '2014-06-29 14:08:34', '2014-06-29 14:08:34', '2014-06-29 14:08:34'),
(17, 1, '2014-06-29 14:08:35', '2014-06-29 14:08:35', '2014-06-29 14:08:35'),
(18, 1, '2014-06-29 14:08:36', '2014-06-29 14:08:36', '2014-06-29 14:08:36'),
(19, 1, '2014-06-29 14:08:37', '2014-06-29 14:08:37', '2014-06-29 14:08:37'),
(20, 1, '2014-06-29 14:08:38', '2014-06-29 14:08:38', '2014-06-29 14:08:38'),
(21, 1, '2014-06-29 14:08:51', '2014-06-29 14:08:51', '2014-06-29 14:08:51'),
(22, 1, '2014-06-29 14:08:52', '2014-06-29 14:08:52', '2014-06-29 14:08:52'),
(23, 1, '2014-06-29 14:08:54', '2014-06-29 14:08:54', '2014-06-29 14:08:54'),
(24, 2, '2014-06-29 14:08:59', '2014-06-29 14:08:59', '2014-06-29 14:08:59'),
(25, 2, '2014-06-29 14:08:59', '2014-06-29 14:08:59', '2014-06-29 14:08:59'),
(26, 2, '2014-06-29 14:09:00', '2014-06-29 14:09:00', '2014-06-29 14:09:00'),
(27, 3, '2014-06-29 14:11:00', '2014-06-29 14:11:00', '2014-06-29 14:11:00'),
(28, 3, '2014-06-29 14:14:38', '2014-06-29 14:14:38', '2014-06-29 14:14:38'),
(29, 3, '2014-06-29 14:17:23', '2014-06-29 14:17:23', '2014-06-29 14:17:23'),
(30, 3, '2014-06-29 14:19:31', '2014-06-29 14:19:31', '2014-06-29 14:19:31'),
(31, 3, '2014-06-29 14:21:23', '2014-06-29 14:21:23', '2014-06-29 14:21:23'),
(32, 1, '2014-06-29 14:26:34', '2014-06-29 14:26:34', '2014-06-29 14:26:34'),
(33, 1, '2014-06-29 14:27:36', '2014-06-29 14:27:36', '2014-06-29 14:27:36'),
(34, 3, '2014-06-29 14:28:00', '2014-06-29 14:28:00', '2014-06-29 14:28:00'),
(35, 3, '2014-06-29 14:32:45', '2014-06-29 14:32:45', '2014-06-29 14:32:45'),
(36, 3, '2014-06-29 14:34:53', '2014-06-29 14:34:53', '2014-06-29 14:34:53'),
(37, 3, '2014-06-29 14:41:45', '2014-06-29 14:41:45', '2014-06-29 14:41:45'),
(38, 3, '2014-06-29 14:46:02', '2014-06-29 14:46:02', '2014-06-29 14:46:02'),
(39, 3, '2014-06-29 14:49:24', '2014-06-29 14:49:24', '2014-06-29 14:49:24'),
(40, 3, '2014-06-29 14:54:41', '2014-06-29 14:54:41', '2014-06-29 14:54:41'),
(41, 3, '2014-06-29 14:55:21', '2014-06-29 14:55:21', '2014-06-29 14:55:21'),
(42, 3, '2014-06-29 14:55:22', '2014-06-29 14:55:23', '2014-06-29 14:55:23'),
(43, 1, '2014-06-29 14:55:24', '2014-06-29 14:55:24', '2014-06-29 14:55:24'),
(44, 2, '2014-06-29 14:55:26', '2014-06-29 14:55:26', '2014-06-29 14:55:26'),
(45, 2, '2014-06-29 14:55:26', '2014-06-29 14:55:26', '2014-06-29 14:55:26'),
(46, 3, '2014-06-29 14:55:28', '2014-06-29 14:55:28', '2014-06-29 14:55:28'),
(47, 2, '2014-06-29 14:58:44', '2014-06-29 14:58:44', '2014-06-29 14:58:44'),
(48, 1, '2014-06-29 14:58:46', '2014-06-29 14:58:46', '2014-06-29 14:58:46'),
(49, 1, '2014-06-29 14:58:47', '2014-06-29 14:58:47', '2014-06-29 14:58:47'),
(50, 3, '2014-06-29 14:58:49', '2014-06-29 14:58:49', '2014-06-29 14:58:49');

-- --------------------------------------------------------

--
-- Table structure for table `orgasms`
--

CREATE TABLE `orgasms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nextOrgasmDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `orgasms`
--

INSERT INTO `orgasms` (`id`, `nextOrgasmDate`, `createdAt`, `updatedAt`) VALUES
(1, '2016-11-14 02:02:03', '2014-06-23 02:02:03', '2014-06-29 14:58:49');

-- --------------------------------------------------------

--
-- Table structure for table `punishmentLogs`
--

CREATE TABLE `punishmentLogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `severity` int(11) DEFAULT NULL,
  `assigned` datetime DEFAULT NULL,
  `maxStart` datetime DEFAULT NULL,
  `maxEnd` datetime DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `punishmentLogs`
--

INSERT INTO `punishmentLogs` (`id`, `title`, `description`, `severity`, `assigned`, `maxStart`, `maxEnd`, `start`, `end`, `createdAt`, `updatedAt`) VALUES
(1, 'Chastity', 'Start a chastity session and choose an end date of at least 3 days.', 3, '2014-07-06 19:47:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2014-07-06 19:47:25', '2014-07-06 19:47:31', '2014-07-06 19:47:19', '2014-07-06 19:47:31'),
(2, 'No Erotica', 'You are not allowed any erotica for 168 hours.', 7, '2014-07-06 20:18:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2014-07-06 20:18:18', '2014-07-06 23:34:47', '2014-07-06 20:18:06', '2014-07-06 23:34:47'),
(3, 'Chastity', 'Start a chastity session and choose an end date of at least 9 days.', 9, '2014-07-06 20:18:08', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2014-07-06 20:18:24', '2014-07-06 20:18:27', '2014-07-06 20:18:08', '2014-07-06 20:18:27'),
(4, 'Write an Erotic Story', 'Write an erotic story with a minimum of 250 words.', 1, '2014-07-06 20:18:11', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2014-07-06 20:18:30', '2014-07-06 23:34:45', '2014-07-06 20:18:11', '2014-07-06 23:34:45');

-- --------------------------------------------------------

--
-- Table structure for table `punishments`
--

CREATE TABLE `punishments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `minDuration` int(11) DEFAULT NULL,
  `maxDuration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `punishments`
--

INSERT INTO `punishments` (`id`, `title`, `description`, `minDuration`, `maxDuration`, `createdAt`, `updatedAt`) VALUES
(1, 'No Television', 'You are not allowed to watch television or movies for %%DATERANGE,1%%.', 0, 0, '2014-06-18 22:12:17', '2014-06-18 22:12:17'),
(2, 'No Erotica', 'You are not allowed any erotica for %%DATERANGE,1%%.', 0, 0, '2014-06-18 22:13:46', '2014-06-18 22:13:46'),
(3, 'Chastity', 'Start a chastity session and choose an end date of at least %%NUMBER,1%% days.', 0, 0, '2014-06-18 22:15:36', '2014-06-18 22:15:36'),
(4, 'Chastity', 'Start a chastity session and choose a random end date.', 0, 0, '2014-06-18 22:15:36', '2014-06-18 22:15:36'),
(5, 'Write an Erotic Story', 'Write an erotic story with a minimum of %%NUMBER,250%% words.', 0, 0, '2014-06-18 22:18:06', '2014-06-18 22:18:06'),
(6, 'Clean', 'Find something that needs cleaning.  Clean for at least %%NUMBER,10%% minutes.', 0, 0, '2014-06-18 22:19:00', '2014-06-18 22:19:00');

-- --------------------------------------------------------

--
-- Table structure for table `taskLogs`
--

CREATE TABLE `taskLogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `severity` int(11) DEFAULT NULL,
  `assigned` datetime DEFAULT NULL,
  `maxStart` datetime DEFAULT NULL,
  `maxEnd` datetime DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `schedule` varchar(255) DEFAULT NULL,
  `minDuration` int(11) DEFAULT NULL,
  `maxDuration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `teaseLogs`
--

CREATE TABLE `teaseLogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `severity` int(11) DEFAULT NULL,
  `assigned` datetime NOT NULL,
  `inChastity` tinyint(1) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `teases`
--

CREATE TABLE `teases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `allowChastity` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `teases`
--

INSERT INTO `teases` (`id`, `title`, `description`, `allowChastity`, `createdAt`, `updatedAt`) VALUES
(1, 'Enjoy Some Erotica', 'You must look at erotica of your choice for at least %%NUMBER,5%% minutes.', 1, '2014-06-18 22:25:57', '2014-06-18 22:25:57'),
(2, 'Edge!!!', 'You must edge %%NUMBER,2%% times holding each edge for at least %%NUMBER,10%% seconds.  You are not allowed to have an orgasm.  Any orgasm must be ruined, logged as masturbation, and the results consumed. ', 0, '2014-06-18 22:25:57', '2014-06-18 22:25:57'),
(3, 'Tease Your Asshole', 'Tease the exterior of your asshole for at least %%NUMBER,2%% minutes.  Tease only the exterior.  Absolutely no insertion.', 1, '2014-06-18 22:29:05', '2014-06-18 22:29:05'),
(4, 'Massage Prostate', 'Massage your prostate for at least %%NUMBER,5%% minutes.  You are not allowed to touch your genitals at all.  Orgasms are not allowed.  If you have an orgasm, you must ruin it, log it as masturbation, and consume the results.', 1, '2014-06-18 22:29:05', '2014-06-18 22:29:05'),
(5, 'Massage', 'Give your wife a full body massage (or whatever she would like) for at least %%NUMBER,10%% minutes.', 1, '2014-06-18 22:30:42', '2014-06-18 22:30:42'),
(6, 'Rub Feet', 'Rub your wife''s feet for at least %%NUMBER,10%% minutes.', 1, '2014-06-18 22:30:42', '2014-06-18 22:30:42'),
(7, 'Rub Head', 'Rub your wife''s head for at least %%NUMBER,10%% minutes.', 1, '2014-06-18 22:31:10', '2014-06-18 22:31:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'ehutson', 'ehutson@gmail.com', '$2a$10$Rl6HWVWkTC/Hs/smmMpKUePK.cjGhSQJrGJy57g8KskxNL9.XmOCC', '2014-06-22 18:12:03', '2014-06-22 18:12:03');
