describe('Restful Booker API Tests', () => {
    let token;
    let bookingId;
    let firstName;
    let lastName;

    it('Step 1: Perform Create Token request', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                username: 'admin',
                password: 'password123',
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            token = response.body.token;
        });
    });

    it('Step 2: Perform Create Booking request', () => {
        const faker = require('@faker-js/faker');
        firstName = faker.faker.name.firstName();
        lastName = faker.faker.name.lastName();

        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: {
                firstname: firstName,
                lastname: lastName,
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                    checkin: '2018-01-01',
                    checkout: '2019-01-01',
                },
                additionalneeds: 'Breakfast',
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.booking).to.have.property('firstname', firstName);
            expect(response.body.booking).to.have.property('lastname', lastName);
            bookingId = response.body.bookingid;
        });
    });

    it('Step 3: Perform Get Booking request', () => {
        cy.request({
            method: 'GET',
            url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        }).then((response) => {
            expect(response.status).to.eq(200); // Վիճակի կոդը 200 է
            expect(response.body).to.have.property('firstname', firstName);
            expect(response.body).to.have.property('lastname', lastName);
            expect(response.body).to.have.property('additionalneeds', 'Breakfast');
        });
    });
});





