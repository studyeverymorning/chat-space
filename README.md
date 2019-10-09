## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group|references|foreign_key: true, null: false|
|user|references|foreign_key: true, null: false|

## Association
- belongs_to :group
- belongs_to :user

## Usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false, index: true|
|Email|text|null: false, unique: true|
|password|text|null: false|

## Association
- has_many :messages
- has_many :groups, through: :groups_users
- has_many :group_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|

## Association
- has_many :messages
- has_many :users, through: :groups_users
- has_many :group_users

