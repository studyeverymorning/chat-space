## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|group_id|integer|foreign_key: true|
|user_id|integer|foreign_key: true|

## Association
- belongs_to :group
- belongs_to :user

## Usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|Email|text|null: false, unique: true|
|password|text|null: false|

## Association
- has_many :messages
- has_many :groups, through: :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false|

## Association
- has_many :messages
- has_many :users, through: :groups_users

