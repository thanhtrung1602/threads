-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2024 at 04:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `threads`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `media` varchar(350) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `content`, `media`, `user_id`, `postId`, `createdAt`, `updatedAt`) VALUES
(23, 'Chào Sơn Tùng', NULL, 'trung.ng16', 6, '2024-07-12 15:25:24', '2024-07-12 15:26:08');

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `id` int(11) NOT NULL,
  `followerId` varchar(255) DEFAULT NULL,
  `followingId` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`id`, `followerId`, `followingId`, `status`, `createdAt`, `updatedAt`) VALUES
(35, 'trung.ng16', 'Thread', NULL, '2024-07-14 06:14:48', '2024-07-14 06:14:48');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `status`, `user_id`, `postId`, `createdAt`, `updatedAt`) VALUES
(187, 1, 'Thread', 6, '2024-07-12 16:17:45', '2024-07-13 04:58:43'),
(189, 1, 'Thread', 7, '2024-07-12 18:26:27', '2024-07-13 04:58:43'),
(190, 1, 'Thread', 26, '2024-07-13 17:09:54', '2024-07-13 17:09:54'),
(191, 1, 'trung.ng16', 26, '2024-07-13 19:16:16', '2024-07-13 19:16:16');

-- --------------------------------------------------------

--
-- Table structure for table `medias`
--

CREATE TABLE `medias` (
  `id` int(11) NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medias`
--

INSERT INTO `medias` (`id`, `media`, `post_id`, `createdAt`, `updatedAt`) VALUES
(4, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720853000/threads/threads_logo.jpg', 22, '2024-07-13 07:33:23', '2024-07-13 07:33:23'),
(5, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720853000/threads/Threads-Logo.png', 22, '2024-07-13 07:33:23', '2024-07-13 07:33:23'),
(6, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu4.jpg', 23, '2024-07-13 08:01:10', '2024-07-13 08:01:10'),
(7, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu1.jpg', 23, '2024-07-13 08:01:10', '2024-07-13 08:01:10'),
(8, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu2.jpg', 23, '2024-07-13 08:01:10', '2024-07-13 08:01:10'),
(9, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu3.jpg', 23, '2024-07-13 08:01:10', '2024-07-13 08:01:10'),
(10, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu4.jpg', 24, '2024-07-13 08:04:41', '2024-07-13 08:04:41'),
(11, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu2.jpg', 24, '2024-07-13 08:04:41', '2024-07-13 08:04:41'),
(12, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu3.jpg', 24, '2024-07-13 08:04:41', '2024-07-13 08:04:41'),
(13, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu1.jpg', 24, '2024-07-13 08:04:41', '2024-07-13 08:04:41'),
(14, 'https://res.cloudinary.com/dxuknuxer/video/upload/v1720858172/threads/Snaptik.mp4', 25, '2024-07-13 08:09:38', '2024-07-13 08:09:38'),
(15, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720853000/threads/threads_logo.jpg', 26, '2024-07-13 14:03:08', '2024-07-13 14:03:08'),
(16, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu4.jpg', 27, '2024-07-13 14:03:49', '2024-07-13 14:03:49'),
(17, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu3.jpg', 27, '2024-07-13 14:03:49', '2024-07-13 14:03:49'),
(18, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu2.jpg', 27, '2024-07-13 14:03:49', '2024-07-13 14:03:49'),
(19, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu1.jpg', 27, '2024-07-13 14:03:49', '2024-07-13 14:03:49'),
(20, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu4.jpg', 28, '2024-07-13 14:31:27', '2024-07-13 14:31:27'),
(21, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu3.jpg', 28, '2024-07-13 14:31:27', '2024-07-13 14:31:27'),
(22, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu2.jpg', 29, '2024-07-13 14:34:52', '2024-07-13 14:34:52'),
(23, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu1.jpg', 29, '2024-07-13 14:34:52', '2024-07-13 14:34:52'),
(24, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu4.jpg', 30, '2024-07-13 14:41:45', '2024-07-13 14:41:45'),
(25, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu3.jpg', 30, '2024-07-13 14:41:45', '2024-07-13 14:41:45'),
(26, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu2.jpg', 30, '2024-07-13 14:41:45', '2024-07-13 14:41:45'),
(27, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu1.jpg', 30, '2024-07-13 14:41:45', '2024-07-13 14:41:45'),
(28, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu4.jpg', 31, '2024-07-13 15:11:57', '2024-07-13 15:11:57'),
(29, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu1.jpg', 31, '2024-07-13 15:11:57', '2024-07-13 15:11:57'),
(30, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu2.jpg', 31, '2024-07-13 15:11:57', '2024-07-13 15:11:57'),
(31, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu4.jpg', 32, '2024-07-13 15:41:53', '2024-07-13 15:41:53'),
(32, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu3.jpg', 32, '2024-07-13 15:41:53', '2024-07-13 15:41:53'),
(33, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu2.jpg', 33, '2024-07-13 15:42:18', '2024-07-13 15:42:18'),
(34, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu1.jpg', 33, '2024-07-13 15:42:18', '2024-07-13 15:42:18'),
(35, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu2.jpg', 34, '2024-07-13 15:43:37', '2024-07-13 15:43:37'),
(36, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu1.jpg', 34, '2024-07-13 15:43:37', '2024-07-13 15:43:37'),
(37, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu4.jpg', 35, '2024-07-13 16:05:55', '2024-07-13 16:05:55'),
(38, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu3.jpg', 35, '2024-07-13 16:05:55', '2024-07-13 16:05:55'),
(39, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857669/threads/dangyeu2.jpg', 35, '2024-07-13 16:05:55', '2024-07-13 16:05:55'),
(40, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu1.jpg', 35, '2024-07-13 16:05:55', '2024-07-13 16:05:55'),
(41, 'https://res.cloudinary.com/dxuknuxer/video/upload/v1720858172/threads/Snaptik.mp4', 36, '2024-07-13 18:25:41', '2024-07-13 18:25:41'),
(42, 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720857670/threads/dangyeu3.jpg', 36, '2024-07-13 18:25:41', '2024-07-13 18:25:41'),
(43, 'https://res.cloudinary.com/dxuknuxer/video/upload/v1720858172/threads/Snaptik.mp4', 37, '2024-07-14 06:05:38', '2024-07-14 06:05:38');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `media` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `content`, `media`, `user_id`, `createdAt`, `updatedAt`) VALUES
(26, 'Welcome to Thread!', NULL, 'Thread', '2024-07-13 14:03:08', '2024-07-13 14:03:08');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('create-comment.js'),
('create-follow.js'),
('create-like.js'),
('create-media.js'),
('create-post.js'),
('create-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `idUser` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `story` varchar(255) DEFAULT NULL,
  `link` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `idUser`, `username`, `image`, `email`, `password`, `story`, `link`, `createdAt`, `updatedAt`) VALUES
(4, 'trung.ng16', 'Nguyễn Thành Trung', 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720428724/threads/wxdie.jpg', 'sun1@gmail.com', '$2a$10$2PnIEkWgfvNKaDAlFvdUY.LMA7AktRlDH8bDOKEkPTfLKyJqpGeXq', '“Cuộc đời đâu phải cuộc đua!”', 'https://www.facebook.com/profile.php?id=100032480142784', '2024-07-04 14:05:16', '2024-07-12 15:26:08'),
(8, 'Thread', 'Threads', 'https://res.cloudinary.com/dxuknuxer/image/upload/v1720809375/threads/threads_logo.jpg', 'a@gmail.com', '$2a$10$41ISWJxE93PkDottLcveP.xhkmxfhLjfPl605WLHeKPi361AFDVTG', 'Đây là trang chính chủ', '', '2024-07-12 15:45:12', '2024-07-13 04:58:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medias`
--
ALTER TABLE `medias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `follows`
--
ALTER TABLE `follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT for table `medias`
--
ALTER TABLE `medias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
