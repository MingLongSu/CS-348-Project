import uuid
import random
from faker import Faker
from datetime import datetime, timedelta

# Initialize Faker
fake = Faker()

# Initialize fixed locations
fixed_cities = [
    "Toronto",
    "Ottawa",
    "Mississauga",
    "Brampton",
    "Hamilton",
    "London",
    "Markham",
    "Vaughan",
    "Kitchener",
    "Windsor"
]

fixed_street_names = [
    "Maple Street",
    "Oak Avenue",
    "Pine Road",
    "Cedar Lane",
    "Elm Street",
    "Birch Boulevard",
    "Willow Way",
    "Ash Court",
    "Cherry Drive",
    "Walnut Street"
]

fixed_descriptions = [
    "Join us for the annual Community Charity Run on August 15th where participants of all ages come together to support local nonprofits. The event will feature a 5K run/walk live music and food trucks. All proceeds will benefit community outreach programs.",
    "Experience a culinary adventure at the Summer Food Festival on July 20th featuring diverse dishes from around the world. Enjoy live cooking demonstrations sample gourmet treats and listen to local bands. Perfect for food enthusiasts and families alike!",
    "Bring your blankets and enjoy a magical evening under the stars at our Outdoor Movie Night on September 10th. The featured film is a family-friendly classic and concessions will be available. Gates open at 7 PM and the movie starts at dusk."
]

fixed_categories = [
    "Food", 
    "18+", 
    "Party",
    "MeetnGreet", 
    "Karaoke"
]

# Number of fake records to generate
num_users = 500
num_events = 10000
num_attendees = 200
num_checkins = 100

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
        start_time = fake.date_time_between(start_date='+1m', end_date='+1y')
        end_time = start_time + timedelta(hours=fake.random_int(min=1, max=8))
        city_name = fixed_cities[random.randint(0, 9)]
        street_number = random.randint(1, 100)
        street_name = fixed_street_names[random.randint(0, 9)]
        event = {
            'event_id': str(uuid.uuid4()),
            'name': fake.word(),
            'city': city_name,
            'address': ("%d %s" % (street_number, street_name)),
            'start_time': start_time.strftime('%Y-%m-%d %H:%M:%S'),
            'end_time': end_time.strftime('%Y-%m-%d %H:%M:%S'),
            'curr_capacity': 0,
            'max_capacity': 100,
            'owner_id': fake.random_element(elements=user_ids),
            'category': fake.random_element(elements=fixed_categories),
            'description': fake.random_element(elements=fixed_descriptions), # DESCRIPTION
            'active': True
        }
        events.append(event)
    return events

# Function to generate a list of fake attendees 
def generate_fake_attendees(event_ids, user_ids): 
    attendees = []
    count = 0
    while (count < num_attendees):
        # Get random event_id and user_id and call that attending
        event_id__owner = event_ids[random.randint(0, num_events - 1)]
        user_id = fake.random_element(elements=user_ids)
        if (user_id != event_id__owner[1]): 
            continue

        attendee = {
            'event_id': event_id__owner[0],
            'user_id': user_id
        }
        if (attendee in attendees):
            continue
        attendees.append(attendee)
        count += 1
    return attendees

# Function to update event capacities based on attendees
def update_event_capacity(events, attendees):
    event_capacity = {event['event_id']: 0 for event in events}
    
    for attendee in attendees:
        event_capacity[attendee['event_id']] += 1
    
    for event in events:
        event['curr_capacity'] = event_capacity[event['event_id']]

# Function to generate a list of fake checkins 
def generate_fake_checkins(attendees):
    checkins = []
    count = 0
    while (count < num_checkins):
        checkin = attendees[random.randint(0, num_attendees - 1)]
        if (checkin in checkins):
            continue
        checkins.append(checkin)
        count += 1

    return checkins

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

# Generate Fake Attendees
event_ids__owners = [(event['event_id'], event['owner_id']) for event in events]
attendees = generate_fake_attendees(event_ids__owners, user_ids)

# Update event capacities
update_event_capacity(events, attendees)

# Write events to events.txt
with open('events.txt', 'w') as file:
    file.write('event_id,name,city,address,start_time,end_time,curr_capacity,max_capacity,owner_id,category,description,active\n')
    for event in events:
        file.write(f"{event['event_id']},{event['name']},{event['city']},{event['address']},{event['start_time']},{event['end_time']},{event['curr_capacity']},{event['max_capacity']},{event['owner_id']},{event['category']},{event['description']},{event['active']}\n")

print(f'{num_events} fake events written to events.txt')

# Write attendees to attendees.txt
with open('attendees.txt', 'w') as file:
    file.write('event_id,user_id\n')
    for attendee in attendees:
        file.write(f"{attendee['event_id']},{attendee['user_id']}\n")

print(f'{num_attendees} fake attendees written to attendees.txt')

# Generate Fake CheckIns
check_ins = generate_fake_checkins(attendees)

# Write events to check-in.txt
with open('check-in.txt', 'w') as file:
    file.write('event_id,user_id\n')
    for check_ins in check_ins:
        file.write(f"{check_ins['event_id']},{check_ins['user_id']}\n")

print(f'{num_checkins} fake checkins from attendees written to events.txt')
