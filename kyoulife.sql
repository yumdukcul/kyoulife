-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-02-06 10:41
-- 서버 버전: 10.4.25-MariaDB
-- PHP 버전: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `kyoulife`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `acctingsyscategory`
--

CREATE TABLE `acctingsyscategory` (
  `idx` int(11) NOT NULL,
  `orderNum` int(11) NOT NULL,
  `categoryId` varchar(20) NOT NULL,
  `categoryName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `acctingsyscategory`
--

INSERT INTO `acctingsyscategory` (`idx`, `orderNum`, `categoryId`, `categoryName`) VALUES
(1, 0, 'center', '중앙자치기구'),
(2, 1, 'libart', '인문사회대학'),
(3, 2, 'natcol', '건강보건대학'),
(4, 3, 'educol', '사범대학'),
(5, 4, 'eco', '경영대학'),
(6, 5, 'law_pol_col', '공공인재대학'),
(7, 6, 'eng', '공과대학'),
(8, 7, 'aisw', 'AI·SW융합대학');

-- --------------------------------------------------------

--
-- 테이블 구조 `acctingsyslist`
--

CREATE TABLE `acctingsyslist` (
  `idx` int(11) NOT NULL,
  `departmentId` varchar(20) NOT NULL,
  `departmentName` varchar(20) NOT NULL,
  `category` varchar(20) NOT NULL,
  `orderNum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `acctingsyslist`
--

INSERT INTO `acctingsyslist` (`idx`, `departmentId`, `departmentName`, `category`, `orderNum`) VALUES
(1, 'council', '총학생회', 'center', 0),
(2, 'delegate', '총대의원회', 'center', 1),
(3, 'club', '동아리연합회', 'center', 2),
(4, 'libart', '인문사회대학 학생회', 'center', 3),
(5, 'natcol', '건강보건대학 학생회', 'center', 4),
(6, 'educol', '사범대학 학생회', 'center', 5),
(7, 'eco', '경영대학 학생회', 'center', 6),
(8, 'lawcol', '공공인재대학 학생회', 'center', 7),
(9, 'eng', '공과대학 학생회', 'center', 8),
(10, 'aisw', 'AI·SW융합대학 학생회', 'center', 9),
(11, 'libart_del', '인문사회대학 대의원회', 'libart', 0),
(12, 'history', '역사학과 학생회', 'libart', 1),
(13, 'english', '영어학과 학생회', 'libart', 2),
(14, 'china', '중국학과 학생회', 'libart', 3),
(15, 'cont', '문화콘텐츠학과 학생회', 'libart', 4),
(16, 'wel', '사회복지학과 학생회', 'libart', 5),
(17, 'sociology', '사회학과 학생회', 'libart', 6),
(18, 'psy', '심리학과 학생회', 'libart', 7),
(19, 'korean', '한국어문학과 학생회', 'libart', 8),
(20, 'natcol_del', '건강보건대학 대의원회', 'natcol', 0),
(21, 'pharm', '제약공학과 학생회', 'natcol', 1),
(22, 'food', '화장품식품개발학부 학생회', 'natcol', 2),
(23, 'nut', '식품영양학과 학생회', 'natcol', 3),
(24, 'spo', '스포츠과학과 학생회', 'natcol', 4),
(25, 'fas', '의류산업학과 학생회', 'natcol', 5),
(26, 'nur', '간호학과 학생회', 'natcol', 6),
(27, 'pt', '물리치료학과 학생회', 'natcol', 7),
(28, 'fobu', '외식조리학과 학생회', 'natcol', 8),
(29, 'ot', '작업치료학과 학생회', 'natcol', 9),
(30, 'health', '보건의료정보학과 학생회', 'natcol', 10),
(31, 'educol_del', '사범대학 대의원회', 'educol', 0),
(32, 'edu', '교육학과 학생회', 'educol', 1),
(33, 'child', '유아교육과 학생회', 'educol', 2),
(34, 'koredu', '국어교육과 학생회', 'educol', 3),
(35, 'enged', '영어교육과 학생회', 'educol', 4),
(36, 'japan', '일어교육과 학생회', 'educol', 5),
(37, 'home', '가정교육과 학생회', 'educol', 6),
(38, 'mathedu', '수학교육과 학생회', 'educol', 7),
(39, 'sedu', '과학교육과 학생회', 'educol', 8),
(40, 'pedu', '체육교육과 학생회', 'educol', 9),
(41, 'aedu', '미술교육과 학생회', 'educol', 10),
(42, 'mudu', '음악교육과 학생회', 'educol', 11),
(43, 'eco_del', '경영대학 대의원회', 'eco', 0),
(44, 'econ', '부동산경제금융학과 학생회', 'eco', 1),
(45, 'kuit', '무역물류학과 학생회', 'eco', 2),
(46, 'business', '경영학부 학생회', 'eco', 3),
(47, 'tourism', '관광학부 학생회', 'eco', 4),
(48, 'mis', '디지털마케팅학과 학생회', 'eco', 5),
(49, 'management', '경영학과(계약학과) 학생회', 'eco', 6),
(50, 'law_pol_col_del', '공공인재대학 대의원회', 'law_pol_col', 0),
(51, 'law', '법학과 학생회', 'law_pol_col', 1),
(52, 'pa', '행정학과 학생회', 'law_pol_col', 2),
(53, 'cop', '경찰학부 학생회', 'law_pol_col', 3),
(54, 'comm', '미디어영상학과 학생회', 'law_pol_col', 4),
(55, 'sec', '경호보안학과 학생회', 'law_pol_col', 5),
(56, 'mil', '군사학과 학생회', 'law_pol_col', 6),
(57, 'eng_del', '공과대학 대의원회', 'eng', 0),
(58, 'me', '기계공학부 학생회', 'eng', 1),
(59, 'smart', '스마트기계융합공학 학생회', 'eng', 2),
(60, 'ee', '전기공학과 학생회', 'eng', 3),
(61, 'mse', '신소재공학과 학생회', 'eng', 4),
(62, 'arch', '건축학부 학생회', 'eng', 5),
(63, 'civ', '재난안전건설학과 학생회', 'eng', 6),
(64, 'environment', '환경에너지공학과 학생회', 'eng', 7),
(65, 'fire', '소방방재공학과 학생회', 'eng', 8),
(66, 'ship', '조선해양시스템공학과 학생회', 'eng', 9),
(67, 'indesign', '디자인학과 학생회', 'eng', 10),
(70, 'aisw_del', 'AI·SW융합대학 대의원회', 'aisw', 0),
(71, 'ce', '컴퓨터공학부 학생회', 'aisw', 1),
(72, 'et', '전자공학과 학생회', 'aisw', 2),
(73, 'ice', '정보통신AI공학과 학생회', 'aisw', 3);

-- --------------------------------------------------------

--
-- 테이블 구조 `docslist`
--

CREATE TABLE `docslist` (
  `idx` int(11) NOT NULL,
  `department` varchar(20) NOT NULL,
  `docType` varchar(5) NOT NULL,
  `eventName` varchar(30) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `eventPlace` varchar(20) NOT NULL,
  `personnel` varchar(20) NOT NULL,
  `purpose` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `state` varchar(10) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `writer` varchar(20) DEFAULT NULL,
  `submitDate` datetime DEFAULT NULL,
  `manager` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `docslist`
--

INSERT INTO `docslist` (`idx`, `department`, `docType`, `eventName`, `startDate`, `endDate`, `eventPlace`, `personnel`, `purpose`, `content`, `state`, `datetime`, `writer`, `submitDate`, `manager`) VALUES
(13, 'council', '기획안', 'zz', '2023-01-01', '2023-01-01', '경남대학교', '경남대학교 학우', '경남대학교\n하궁\n여러분을\n위해', '', '승인전', '2023-02-03 08:44:33', NULL, NULL, NULL),
(14, 'council', '예산안', '행사명', '2023-02-01', '2023-02-01', '', '', '', '{\"income\":{\"total\":0,\"incomeDetails\":[{\"content\":\"수입내용1\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"1\",\"quantity\":1,\"price\":1},{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"2\",\"quantity\":2,\"price\":2}],\"place\":\"ㄴ\",\"total\":5},{\"content\":\"수입내용2\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"3\",\"quantity\":3,\"price\":3}],\"total\":9},{\"content\":\"수입내용3\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"4\",\"quantity\":4,\"price\":4}],\"total\":16}]},\"spend\":{\"total\":0,\"spendDetails\":[{\"content\":\"내용\",\"place\":\"구매처\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"2\",\"quantity\":2,\"price\":2},{\"orderNum\":0,\"receiptCategory\":\"할인\",\"item\":\"3\",\"quantity\":3,\"price\":2},{\"orderNum\":0,\"receiptCategory\":\"수수료\",\"item\":\"4\",\"quantity\":4,\"price\":4}],\"total\":14}]}}', '승인전', '2023-02-03 09:35:25', NULL, NULL, NULL),
(15, 'council', '결과보고서', 'zz', '2022-11-04', '2022-11-04', '하이', '하이', '', '{\"eventImage\":[{\"path\":\"이재곤.jpg\"}],\"itemImage\":[]}', '승인전', '2023-02-04 22:59:06', NULL, NULL, NULL),
(16, 'council', '결과보고서', 'ㄴㄴ', '0002-02-02', '0002-02-02', '2', '2', '', '{\"eventImage\":[{\"path\":\"정태욱.jpg\"}],\"itemImage\":[]}', '승인전', '2023-02-04 23:00:13', NULL, NULL, NULL),
(17, 'council', '결과보고서', 'ㄴㄴ', '2023-02-05', '2023-02-16', 'ㄴㄴㄴ', 'ㄴㄴㄴ', '', '{\"eventImage\":[{\"path\":\"이재곤.jpg\"},{\"path\":\"장원준.jpg\"},{\"path\":\"정태욱.jpg\"}],\"itemImage\":[]}', '승인전', '2023-02-04 23:01:20', NULL, NULL, NULL),
(18, 'council', '결과보고서', 's', '2023-02-10', '2023-02-01', '222', '222', '', '{\"eventImage\":[{\"path\":\"장원준.jpg\"}],\"itemImage\":[]}', '승인전', '2023-02-04 23:14:24', NULL, NULL, NULL),
(19, 'council', '결과보고서', 'asd', '2023-02-04', '2023-02-01', 'asd', 'asd', '', '{\"eventImage\":[\"230205084024_장원준.jpg\",\"230205084024_정태욱.jpg\"],\"itemImage\":[\"230205084024_이재곤.jpg\"]}', '승인전', '2023-02-04 23:40:24', NULL, NULL, NULL),
(20, 'council', '결과보고서', 'asdad', '0002-02-02', '0002-02-02', 'asdasd', 'asdda', '', '{\"eventImage\":[\"230205091218_이재곤.jpg\",\"230205091218_장원준.jpg\"],\"itemImage\":[\"230205091219_이재곤.jpg\",\"230205091219_banner1.png\"]}', '승인', '2023-02-05 00:12:19', NULL, NULL, NULL),
(21, 'council', '결과보고서', 'sad', '2023-02-09', '2023-02-15', 's', 's', '', '{\"eventImage\":[\"230205091434_banner1.png\",\"230205091434_logo.png\",\"230205091434_logo_white.png\",\"230205091434_s_image.png\"],\"itemImage\":[]}', '승인', '2023-02-05 00:14:34', NULL, NULL, NULL),
(22, 'delegate', '기획안', 'sss', '0022-02-02', '0022-02-02', 'ssd', 'sadad', 'zz', '', '승인전', '2023-02-05 01:17:20', NULL, NULL, NULL),
(23, 'council', '기획안', '기획안', '2023-02-05', '2023-02-06', '경남대', '경남대 학우', '재미난 캠퍼스 라이프를 위해서', '', '승인', '2023-02-05 12:26:24', NULL, NULL, NULL),
(24, 'council', '예산안', '예산안', '2023-02-05', '2023-02-05', '', '', '', '{\"income\":{\"total\":0,\"incomeDetails\":[{\"content\":\"-\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"-\",\"quantity\":0,\"price\":0}],\"total\":0}]},\"spend\":{\"total\":0,\"spendDetails\":[{\"content\":\"-\",\"place\":\"-\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"-\",\"quantity\":0,\"price\":0}],\"total\":0}]}}', '승인전', '2023-02-05 12:53:28', NULL, NULL, NULL),
(25, 'council', '결산안', '결산안', '2023-02-05', '2023-02-05', '', '', '', '{\"income\":{\"total\":0,\"incomeDetails\":[{\"content\":\"-\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"-\",\"quantity\":0,\"price\":0}],\"total\":0},{\"content\":\"-\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"-\",\"quantity\":0,\"price\":0},{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"-\",\"quantity\":0,\"price\":0}],\"total\":0},{\"content\":\"-\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"-\",\"quantity\":0,\"price\":0}],\"total\":0}]},\"spend\":{\"total\":0,\"spendDetails\":[{\"content\":\"-\",\"place\":\"-\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"-\",\"quantity\":0,\"price\":0}],\"total\":0},{\"content\":\"-\",\"place\":\"-\",\"receipts\":[{\"orderNum\":0,\"receiptCategory\":\"\",\"item\":\"-\",\"quantity\":0,\"price\":0}],\"total\":0}]}}', '승인전', '2023-02-05 12:55:28', NULL, NULL, NULL),
(26, 'council', '결과보고서', '결과보고서', '2023-02-05', '2023-02-05', '장소', '인원', '', '{\"eventImage\":[\"230205215759_2.jpg\",\"230205215759_실내 그림.png\",\"230205215759_실내 그림.png\",\"230205215800_실내 그림.png\"],\"itemImage\":[\"230205215800_실내 그림.png\",\"230205215800_실내 그림.png\",\"230205215801_실내 그림.png\",\"230205215801_실내 그림.png\",\"230205215802_실내 그림.png\",\"230205215802_실내 그림.png\",\"230205215802_실내 그림.png\",\"230205215803_실내 그림.png\",\"230205215803_실내 그림.png\",\"230205215803_실내 그림.png\",\"230205215804_실내 그림.png\",\"230205215804_실내 그림.png\",\"230205215805_실내 그림.png\"]}', '승인전', '2023-02-05 12:58:05', NULL, NULL, NULL),
(27, 'council', '결과보고서', 'ㅋㅋ', '2023-02-25', '2023-02-09', 'ㄴㄴ', 'ㄴㄴ', '', '{\"eventImage\":[\"230205220707_KakaoTalk_20230205_220611940.jpg\"],\"itemImage\":[]}', '승인전', '2023-02-05 13:07:07', NULL, NULL, NULL),
(28, 'council', '기획안', 'z', '2023-02-07', '2023-02-07', 'z', 'z', 'z', '', '승인전', '2023-02-06 01:33:14', NULL, NULL, NULL),
(29, 'council', '기획안', 'z', '2023-02-06', '2023-02-07', 's', 's', 's', '', '승인전', '2023-02-06 01:33:32', NULL, NULL, NULL),
(30, 'council', '기획안', '123123', '2023-02-07', '2023-02-07', '23', '233', '2', '', '승인전', '2023-02-06 04:44:18', NULL, NULL, NULL),
(31, 'council', '기획안', 'zzz', '2023-02-06', '2023-02-07', 'zzz', 'zzz', 'zzzz', '', '승인', '2023-02-06 04:45:44', 'whrhkdgh1104', '2023-02-06 04:54:00', 'whrhkdgh1104');

-- --------------------------------------------------------

--
-- 테이블 구조 `ledgerlist`
--

CREATE TABLE `ledgerlist` (
  `idx` int(11) NOT NULL,
  `department` varchar(20) NOT NULL,
  `txDate` date NOT NULL,
  `eventName` varchar(30) NOT NULL,
  `txCategory` varchar(5) NOT NULL,
  `receiptNum` varchar(10) NOT NULL,
  `bankbook` varchar(30) NOT NULL,
  `amount` int(11) NOT NULL,
  `paymentMethod` varchar(10) NOT NULL,
  `receiptDetails` text NOT NULL,
  `note` varchar(255) NOT NULL,
  `state` varchar(10) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `writer` varchar(20) DEFAULT NULL,
  `modifyDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `ledgerlist`
--

INSERT INTO `ledgerlist` (`idx`, `department`, `txDate`, `eventName`, `txCategory`, `receiptNum`, `bankbook`, `amount`, `paymentMethod`, `receiptDetails`, `note`, `state`, `datetime`, `writer`, `modifyDate`) VALUES
(2, 'council', '2023-01-02', 'd', '수입', '22', 'z', 34000, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"\",\"item\":\"물병\",\"quantity\":3000,\"price\":12,\"total\":36000},{\"orderNum\":2,\"receiptCategory\":\"할인\",\"item\":\"물병할인\",\"quantity\":1,\"price\":2000,\"total\":2000}]', '', '기한미준수', '2023-01-31 08:05:36', NULL, NULL),
(3, 'council', '2023-01-31', 'd', '지출', '22', 'z', 34000, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"\",\"item\":\"물병\",\"quantity\":3000,\"price\":12,\"total\":36000},{\"orderNum\":2,\"receiptCategory\":\"할인\",\"item\":\"물병할인\",\"quantity\":1,\"price\":2000,\"total\":2000}]', '', '', '2023-01-31 08:05:42', NULL, NULL),
(4, 'council', '2023-01-26', '22', '수입', '', '22', 0, '', '', '', '', '2023-01-31 10:48:51', NULL, NULL),
(5, 'council', '2023-01-01', '01', '수입', '', '0', 20, '', '', '', '', '2023-01-31 10:53:10', NULL, NULL),
(6, 'council', '2023-02-05', '행사명이 겁나게 깁니다 예를 들어 이런식으로 길면 줄바', '수입', '22-22-22', '안녕', 0, '', '', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '', '2023-01-31 15:11:07', NULL, '2023-02-06 04:33:09'),
(7, 'council', '2023-01-31', '행사', '지출', 'ㅇ', 'ㅇ', 0, '카드결제', '[]', '', '수정전', '2023-01-31 15:12:01', NULL, NULL),
(8, 'council', '2023-01-31', '행사명', '지출', '01-31-01', 'ㅇ', 543000, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"일반\",\"item\":\"품목\",\"quantity\":1500,\"price\":2,\"total\":3000},{\"orderNum\":2,\"receiptCategory\":\"수수료\",\"item\":\"배송비\",\"quantity\":60,\"price\":10000,\"total\":600000},{\"orderNum\":3,\"receiptCategory\":\"할인\",\"item\":\"할인\",\"quantity\":60,\"price\":1000,\"total\":60000}]', 'ㅇㅁㄴㅇ', '', '2023-01-31 15:13:47', NULL, NULL),
(9, 'council', '2023-02-13', '테스트', '수입', '', 'Zz', 0, '', '', '', '수정전', '2023-02-01 02:50:52', NULL, NULL),
(10, 'council', '2023-02-13', '폰', '수입', '', '폰', 0, '', '', '', '수정전', '2023-02-01 02:52:44', NULL, NULL),
(11, 'council', '0002-02-02', '123', '수입', '', '11', 11, '', '', '', '', '2023-02-01 04:28:47', NULL, NULL),
(12, 'delegate', '0002-02-02', '2', '수입', '', '2', 0, '', '', '', '', '2023-02-01 04:29:37', NULL, NULL),
(13, 'delegate', '0001-11-11', '1', '수입', '', '1', 0, '', '', '', '', '2023-02-01 04:29:53', NULL, NULL),
(14, 'delegate', '2023-01-27', '발신문서 전산화', '지출', '01-27-01', '강영진(경남대학교총', 150000, '계좌이체', '[{\"orderNum\":1,\"receiptCategory\":\"\",\"item\":\"도메인비용\",\"quantity\":1,\"price\":150000,\"total\":150000}]', '도메인비용은 인터넷 도메인 비용입니다.', '', '2023-02-01 04:44:14', NULL, NULL),
(15, 'natcol', '0001-01-01', '1', '수입', '', '1', 0, '', '', '', '', '2023-02-01 04:59:31', NULL, NULL),
(16, 'natcol', '0002-02-02', '2', '지출', '2', '2', 0, '카드결제', '[]', '', '', '2023-02-01 04:59:48', NULL, NULL),
(17, 'delegate', '2023-02-15', '발신문서 전산화', '지출', '01-27-01', '강영진 (경남대학교총대', 2, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"\",\"item\":\"달력\",\"quantity\":1,\"price\":1500,\"total\":1500},{\"orderNum\":2,\"receiptCategory\":\"할인\",\"item\":\"1+1\",\"quantity\":1,\"price\":1000,\"total\":1000},{\"orderNum\":3,\"receiptCategory\":\"수수료\",\"item\":\"국민\",\"quantity\":1,\"price\":2000,\"total\":2000}]', '', '', '2023-02-01 08:26:56', NULL, NULL),
(18, 'delegate', '2023-02-01', '발신문서 전산화', '지출', '02-01-01', '강영진(경남대학교총대', 500, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"\",\"item\":\"달력\",\"quantity\":1,\"price\":1500,\"total\":1500},{\"orderNum\":2,\"receiptCategory\":\"할인\",\"item\":\"1+1\",\"quantity\":1,\"price\":1000,\"total\":1000}]', '', '', '2023-02-01 08:26:59', NULL, NULL),
(19, 'delegate', '2023-02-07', '발신문서 전산화', '지출', '02-01-01', '강영진(경남대학교총대', 500, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"\",\"item\":\"달력\",\"quantity\":1,\"price\":1500,\"total\":1500},{\"orderNum\":2,\"receiptCategory\":\"할인\",\"item\":\"1+1\",\"quantity\":1,\"price\":1000,\"total\":1000}]', '', '', '2023-02-01 08:27:10', NULL, NULL),
(20, 'delegate', '2023-02-02', '발신문서전산화', '지출', '02-02-01', '강영진(경남대학교총대', 1, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"\",\"item\":\"달력 \",\"quantity\":1,\"price\":1500,\"total\":1500},{\"orderNum\":2,\"receiptCategory\":\"할인\",\"item\":\"1+1\",\"quantity\":1,\"price\":1000,\"total\":1000},{\"orderNum\":3,\"receiptCategory\":\"수수료\",\"item\":\"부가세 \",\"quantity\":1,\"price\":1000,\"total\":1000}]', '', '', '2023-02-01 08:27:15', NULL, NULL),
(21, 'delegate', '2023-02-01', '발신문서 전산화', '지출', '02-01-01', '강영진(경남대학교총대', 500, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"일반\",\"item\":\"달력\",\"quantity\":1,\"price\":1500,\"total\":1500},{\"orderNum\":2,\"receiptCategory\":\"할인\",\"item\":\"1+1\",\"quantity\":1,\"price\":1000,\"total\":1000}]', '', '', '2023-02-01 08:27:33', NULL, NULL),
(22, 'delegate', '2023-02-01', '발신문서전산화', '지출', '123456789', '강영진(경남대학교총대', 800, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"\",\"item\":\"달력\",\"quantity\":1,\"price\":1500,\"total\":1500},{\"orderNum\":2,\"receiptCategory\":\"할인\",\"item\":\"1+1\",\"quantity\":1,\"price\":1000,\"total\":1000},{\"orderNum\":3,\"receiptCategory\":\"수수료\",\"item\":\"수수료\",\"quantity\":1,\"price\":300,\"total\":300}]', '', '', '2023-02-01 08:27:58', NULL, NULL),
(23, 'delegate', '2023-02-01', '발신문서 전산화', '지출', '02-01-01', '강영진 (경남대학교총대', 500, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"일반\",\"item\":\"달력\",\"quantity\":1,\"price\":1500,\"total\":1500},{\"orderNum\":2,\"receiptCategory\":\"할인\",\"item\":\"1+1\",\"quantity\":1,\"price\":1000,\"total\":1000}]', '', '', '2023-02-01 08:28:10', NULL, NULL),
(24, 'natcol', '2023-01-15', '오티', '수입', '', '강수인(경호보안학과', 10, '', '', '배드민턴 참가비입니다. ', '', '2023-02-01 08:32:43', NULL, NULL),
(25, 'eco', '2023-02-03', '공대 vs 상대 ', '수입', '', '공대짱', 1, '', '', '꽁돈', '', '2023-02-01 08:32:59', NULL, NULL),
(26, 'lawcol', '2023-02-01', '뇌물', '수입', '', '박가은', 5, '', '', '주고 싶어서 줌(앞으로 잘해달라고)', '', '2023-02-01 08:33:02', NULL, NULL),
(27, 'educol', '2023-02-01', '달력', '수입', '', '김한결 (총대의원회', 1, '', '', '', '', '2023-02-01 08:33:07', NULL, NULL),
(28, 'libart', '2023-02-01', '스시', '수입', '', '강영진(경남대학교총대', 150, '', '', '지원금', '', '2023-02-01 08:33:35', NULL, NULL),
(29, 'eng', '2023-02-01', '호두오늘미용함', '수입', '', '담당대의원', 0, '', '', '', '', '2023-02-01 08:33:44', NULL, NULL),
(30, 'council', '2022-01-01', '1', '지출', '12-12-12', '12', -5192, '카드결제', '[{\"orderNum\":1,\"receiptCategory\":\"일반\",\"item\":\"1\",\"quantity\":1,\"price\":2000,\"total\":2000},{\"orderNum\":2,\"receiptCategory\":\"할인\",\"item\":\"2\",\"quantity\":1,\"price\":22000,\"total\":22000},{\"orderNum\":3,\"receiptCategory\":\"수수료\",\"item\":\"3123\",\"quantity\":12,\"price\":1234,\"total\":14808}]', '', '', '2023-02-01 08:35:34', NULL, NULL),
(31, 'club', '2023-02-01', '사무국', '수입', '', '류지완(경남대학교총대', 10, '', '', '최강공대 입학비', '', '2023-02-01 08:36:25', NULL, NULL),
(32, 'council', '2019-01-01', '전자장부', '수입', '', '1', 10, '', '', '', '', '2023-02-01 08:50:22', NULL, NULL),
(33, 'council', '2023-02-01', '1', '수입', '', '1', 13555, '', '', '', '', '2023-02-01 08:52:05', NULL, NULL),
(34, 'council', '2023-02-04', '11111', '지출', '22', 'z', 4, '계좌이체', '[{\"orderNum\":1,\"receiptCategory\":\"\",\"item\":\"1\",\"quantity\":2,\"price\":2,\"total\":4}]', '', '', '2023-02-01 09:45:56', NULL, NULL),
(35, 'council', '2023-02-04', '11111', '지출', '22', 'z', 4, '계좌이체', '[{\"orderNum\":1,\"receiptCategory\":\"\",\"item\":\"1\",\"quantity\":2,\"price\":2,\"total\":4}]', '', '수정전', '2023-02-01 09:54:10', NULL, NULL),
(36, 'council', '0202-11-01', '1', '수입', '2', '3', 0, '', '', '', '', '2023-02-01 09:54:48', NULL, NULL),
(37, 'aisw', '2022-01-01', 'aaa', '수입', '01-01-01', 'aa', 0, '', '', 'sszz', '', '2023-02-01 09:58:36', NULL, NULL),
(38, 'aisw', '0002-02-02', '2', '수입', '', '2', 0, '', '', '', '', '2023-02-01 10:24:28', NULL, NULL),
(39, 'aisw', '2018-12-02', '3', '수입', '', '3', 0, '', '', '', '', '2023-02-01 10:27:19', NULL, NULL),
(40, 'libart_del', '2023-02-05', 'ss', '수입', '00-11-12', 'ssdda', 122, '', '', 'sdasdasd', '', '2023-02-05 12:18:19', NULL, NULL),
(41, 'council', '2023-02-06', 'ㅋㅋ', '수입', '01-31-01', 'ㄴ', 0, '', '', 'ㅋ', '', '2023-02-06 01:45:07', 'whrhkdgh1104', '2023-02-06 01:46:00');

-- --------------------------------------------------------

--
-- 테이블 구조 `user`
--

CREATE TABLE `user` (
  `idx` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  `studentId` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `nickname` varchar(10) DEFAULT NULL,
  `asLev` int(11) DEFAULT 0,
  `asCat` varchar(20) DEFAULT '',
  `asDep` varchar(20) DEFAULT '',
  `usercol` varchar(45) DEFAULT NULL,
  `regDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `user`
--

INSERT INTO `user` (`idx`, `username`, `password`, `name`, `studentId`, `email`, `nickname`, `asLev`, `asCat`, `asDep`, `usercol`, `regDate`) VALUES
(1, 'whrhkdgh1104', '$2a$10$qx6LRD6BsnD5GSVzNLflqO7Usr7i3HnHSS3q7ZTIjCd9Y7C5an4ey', '조광호', NULL, 'whrhkdgh1104@gmail.com', '조강', 10, 'center', 'council', NULL, '2023-02-06 10:07:48'),
(2, 'komo9925', '$2a$10$UGi/XIv2JbMNqDtA/5x4eupyKUT5HO/5qtJ/0I/DhDND6mDdofDgq', '강영진', NULL, 'wls9925@naver.com', '염덕철', 6, 'center', 'council', NULL, '2023-02-06 10:07:48'),
(3, 'rjs8287', '$2a$10$UkpN/MGWaKl3fcaiopruSeOVaoZeKRmVsMxq8.K62HlBi.FICqXru', '박건우', NULL, 'rjs8287@naver.com', '독거노인연탄도둑', 3, '', 'sociology', NULL, '2023-02-06 10:07:48'),
(4, 'lcj9203', '$2a$10$c2DRPGlsfTH4Yus6JXRJZOGJ37B6bHF7yqeyBHqSuf2a.OGnzllPW', '이찬중 ', NULL, 'lcj92031@gmail.com', '이메일', 0, '', '', NULL, '2023-02-06 10:07:48'),
(5, 'gangsangj', '$2a$10$K99eZ1Wv317PIAaKltp1P.SiBcZxujyyngY3WtXXe7N6CUFmvqHZ2', '강상준', NULL, 'gangsangj@naver.com', '관리자', 0, '', '', NULL, '2023-02-06 10:07:48'),
(6, 'jlwan1', '$2a$10$mcEj0eUNLZYHI0kssujWPOD4Cz0apB1qaxz92aDbFxzrhY/fQomQi', '류지완', NULL, 'jlwan@naver.com', 'mksoulmate', 0, '', '', NULL, '2023-02-06 10:07:48'),
(7, 'dasomindae', '$2a$10$ULneKb6lM332Kbmm4/mLo.RuKVnZsq4LegbGWAsGJkbSxndhXKExK', '정다솜', NULL, 'eeektha@naver.com', '호두', 0, '', '', NULL, '2023-02-06 10:07:48'),
(8, 'alsrl9592', '$2a$10$WGwAl5Kshlh6cCQR/hsDPeR4BUwQqmaBaT7YdSz4qReWNRqgruxIK', '신민기', NULL, 'sinminki4265@naver.com', '부산돌맹이', 0, '', '', NULL, '2023-02-06 10:07:48'),
(9, 'rkdms7746', '$2a$10$jnvSdmFow/9WQ8dSuu9X8u4vQS8P1TlMXnTzCn4/sdTnlmTGOg8R.', '박가은', NULL, 'rkdms7746@naver.com', '울산강동동', 0, '', '', NULL, '2023-02-06 10:07:48'),
(10, 'solx7950', '$2a$10$Irvv/V/j85emsb8jbZctxOv82lBThdmWFfi802ctQOA.moWl7K7sC', '김하늘', NULL, 'solx7950@naver.com', '옥수수수염카', 0, '', '', NULL, '2023-02-06 10:07:48'),
(11, 'jin25580', '$2a$10$BAFWnVkwEXtP1UdiZhEole0tgXEFZwkQtleN2Llfo6XRjofFJwab2', '진예림', NULL, 'jin25580@naver.com', '초코하임', 0, '', '', NULL, '2023-02-06 10:07:48'),
(12, 'sj7323', '$2a$10$OzCUMcdt0PikGVkeN6X6e.0Avcw9kZ0p0cMWrH81eUilodlcS06qW', '박세진', NULL, 'sejin235265@naver.com', '리타', 0, '', '', NULL, '2023-02-06 10:07:48'),
(13, 'suinindeyo', '$2a$10$gbJ8mQFSsliK1ZjVHdrBSOBCX7mcLDYzKC66pKRgXpcy9JgOvvpP6', '강수인', NULL, 'suinindeyo@naver.com', '삼천포조이', 0, '', '', NULL, '2023-02-06 10:07:48'),
(14, 'gksruf530', '$2a$10$Yp6fAf4BUXKt2G7AaUpYe.lOEhxxaQwClEZJV5TB0wY/5RBZASneC', '김한결', NULL, 'gksruf530@naver.com', '자두', 0, '', '', NULL, '2023-02-06 10:07:48'),
(15, 'testid', '$2a$10$DN5KJ0Y74Vu8pB0PEgIaLeyO7WgaRIiyUbn69S/GjsPrs8UPaufuK', '테스트', NULL, 'test@email.com', '테스트', 0, '', 'council', NULL, '2023-02-06 10:07:48'),
(16, 'koko9925', '$2a$10$L3kjS6fABLz7ViR7QH4sJ.OuYYcakHhalktJXJCv/Opwk1Hdwm96S', '강영진부계', NULL, 'komo9925@gmail.com', '부계임돠', 0, '', '', NULL, '2023-02-06 10:07:48');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `acctingsyscategory`
--
ALTER TABLE `acctingsyscategory`
  ADD PRIMARY KEY (`idx`),
  ADD UNIQUE KEY `categoryId` (`categoryId`);

--
-- 테이블의 인덱스 `acctingsyslist`
--
ALTER TABLE `acctingsyslist`
  ADD PRIMARY KEY (`idx`),
  ADD UNIQUE KEY `departmentId` (`departmentId`);

--
-- 테이블의 인덱스 `docslist`
--
ALTER TABLE `docslist`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `ledgerlist`
--
ALTER TABLE `ledgerlist`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idx`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `studentId` (`studentId`),
  ADD UNIQUE KEY `nickname` (`nickname`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `acctingsyscategory`
--
ALTER TABLE `acctingsyscategory`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 테이블의 AUTO_INCREMENT `acctingsyslist`
--
ALTER TABLE `acctingsyslist`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- 테이블의 AUTO_INCREMENT `docslist`
--
ALTER TABLE `docslist`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- 테이블의 AUTO_INCREMENT `ledgerlist`
--
ALTER TABLE `ledgerlist`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- 테이블의 AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
