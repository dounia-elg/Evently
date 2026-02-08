import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';


import { AppModule } from './../src/app.module';
import { UserRole } from './../src/users/entities/user.entity';
import { EventStatus } from './../src/events/entities/event.entity';

describe('Evently E2E Scenario', () => {
  let app: INestApplication;
  let adminToken: string;
  let participantToken: string;
  let eventId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Scenario Part 1: Admin Journey (Register, Login, Create Event)', async () => {
    const uniqueEmail = `admin_${Date.now()}@example.com`;

    // 1. Register Admin
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: uniqueEmail,
        firstName: 'Super',
        lastName: 'Admin',
        password: 'password123',
        role: UserRole.ADMIN,
      })
      .expect(201);

    // 2. Login Admin
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: uniqueEmail,
        password: 'password123',
      })
      .expect(201);

    adminToken = loginRes.body.access_token;
    expect(adminToken).toBeDefined();

    // 3. Create Published Event
    const eventRes = await request(app.getHttpServer())
      .post('/events')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'E2E Test Workshop',
        description: 'Learning how to test NestJS apps',
        dateTime: new Date().toISOString(),

        location: 'Cloud',
        maxCapacity: 5,
        status: EventStatus.PUBLISHED,
      })
      .expect(201);

    eventId = eventRes.body.id;
    expect(eventId).toBeDefined();
  });

  it('Scenario Part 2: Participant Journey (Register, Find Event, Reserve)', async () => {
    const uniqueEmail = `user_${Date.now()}@example.com`;

    // 1. Register Participant
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: uniqueEmail,
        firstName: 'Jane',
        lastName: 'Doe',
        password: 'password123',
        role: UserRole.PARTICIPANT,
      })
      .expect(201);

    // 2. Login Participant
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: uniqueEmail,
        password: 'password123',
      })
      .expect(201);

    participantToken = loginRes.body.access_token;

    // 3. Browse Events (verify our event is there)
    const browseRes = await request(app.getHttpServer())
      .get('/events')
      .expect(200);

    const found = browseRes.body.find((e: any) => e.id === eventId);
    expect(found).toBeDefined();
    expect(found.title).toBe('E2E Test Workshop');

    // 4. Create Reservation
    const reserveRes = await request(app.getHttpServer())
      .post('/reservations')
      .set('Authorization', `Bearer ${participantToken}`)
      .send({ eventId })
      .expect(201);

    expect(reserveRes.body.event.id).toBe(eventId);
    expect(reserveRes.body.status).toBe('PENDING');
  });
});
