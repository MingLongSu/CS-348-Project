import uuid
from faker import Faker
from datetime import datetime, timedelta

# Initialize Faker
fake = Faker()

# Number of fake records to generate
num_users = 5
num_events = 5

# Function to generate a list of fake users
def generate_fake_users(num_users):
    users = []
    for _ in range(num_users):
        user = {
            'user_id': str(uuid.uuid4()),
            'first_name': fake.first_name(),
            'last_name': fake.last_name(),
            'age': fake.random_int(min=18, max=90),
            'gender': fake.random_element(elements=('M', 'F')),
            'strikes': fake.random_int(min=0, max=3)
        }
        users.append(user)
    return users

# Function to generate a list of fake events
def generate_fake_events(num_events, user_ids):
    events = []
    for _ in range(num_events):
        start_time = fake.date_time_between(start_date='-1y', end_date='+1y')
        end_time = start_time + timedelta(hours=fake.random_int(min=1, max=8))
        event = {
            'event_id': str(uuid.uuid4()),
            'name': fake.color(),
            'location': fake.color(),
            'start_time': start_time.strftime('%Y-%m-%d %H:%M:%S'),
            'end_time': end_time.strftime('%Y-%m-%d %H:%M:%S'),
            'curr_capacity': 0,
            'max_capacity': 100,
            'owner_id': fake.random_element(elements=user_ids),
            'category': fake.word(),
            'description': fake.color(),
            'active': True
        }
        events.append(event)
    return events

# Generate fake users
users = generate_fake_users(num_users)

# Write users to users.txt
with open('users.txt', 'w') as file:
    file.write('user_id,first_name,last_name,age,gender,strikes\n')
    for user in users:
        file.write(f"{user['user_id']},{user['first_name']},{user['last_name']},{user['age']},{user['gender']},{user['strikes']}\n")

print(f'{num_users} fake users written to users.txt')

# Select users with 3 strikes
banned_users = [user for user in users if user['strikes'] == 3]

# Write banned user_ids to banlist.txt
with open('banlist.txt', 'w') as file:
    file.write('user_id\n')
    for user in banned_users:
        file.write(f"{user['user_id']}\n")

print(f'{len(banned_users)} banned user_ids written to banlist.txt')

# Exclude banned users from user_ids list for events
banned_user_ids = [user['user_id'] for user in banned_users]
user_ids = [user['user_id'] for user in users if user['user_id'] not in banned_user_ids]

# Generate fake events
events = generate_fake_events(num_events, user_ids)

# Write events to events.txt
with open('events.txt', 'w') as file:
    file.write('event_id,name,location,start_time,end_time,curr_capacity,max_capacity,owner_id,category,description,active\n')
    for event in events:
        file.write(f"{event['event_id']},{event['name']},{event['location']},{event['start_time']},{event['end_time']},{event['curr_capacity']},{event['max_capacity']},{event['owner_id']},{event['category']},{event['description']},{event['active']}\n")

print(f'{num_events} fake events written to events.txt')

# need to add something to add valid users to attendees.txt