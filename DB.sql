CREATE TABLE `user_member` (
  `user_id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_login_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录名',
  `user_real_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '实际姓名',
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '手机',
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `salt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '盐',
  `create_by` bigint DEFAULT NULL COMMENT '创建人id',
  `create_by_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint DEFAULT NULL COMMENT '修改人id',
  `update_by_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;