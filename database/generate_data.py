import uuid
from faker import Faker
from datetime import datetime, timedelta

# Initialize Faker
fake = Faker()

# Number of fake records to generate
num_users = 100
num_events = 50

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
        event = {
            'event_id': str(uuid.uuid4()),
            'name': 'hello',
            'location': fake.city(),
            'event_time': fake.date_time_between(start_date='-1y', end_date='+1y').strftime('%Y-%m-%d %H:%M:%S'),
            'curr_capacity': fake.random_int(min=0, max=100),
            'max_capacity': 100,
            'owner_id': fake.random_element(elements=user_ids),
            'category': fake.word(),
            'description': 'hello'
        }
        events.append(event)
    return events

# Generate fake users and write to users.txt
users = generate_fake_users(num_users)
with open('../sample_data/users.txt', 'w') as file:
    file.write('user_id,first_name,last_name,age,gender,strikes\n')
    for user in users:
        file.write(f"{user['user_id']},{user['first_name']},{user['last_name']},{user['age']},{user['gender']},{user['strikes']}\n")

print(f'{num_users} fake users written to users.txt')

# Generate fake events and write to events.txt
user_ids = [user['user_id'] for user in users]
events = generate_fake_events(num_events, user_ids)
with open('../sample_data/events.txt', 'w') as file:
    file.write('event_id,name,location,event_time,curr_capacity,max_capacity,owner_id,category,description\n')
    for event in events:
        file.write(f"{event['event_id']},{event['name']},{event['location']},{event['event_time']},{event['curr_capacity']},{event['max_capacity']},{event['owner_id']},{event['category']},{event['description']}\n")

print(f'{num_events} fake events written to events.txt')

