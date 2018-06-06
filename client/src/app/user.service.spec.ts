import {
  TestBed,
  getTestBed,
  async,
  inject
} from '@angular/core/testing';
import {
  Headers,
  BaseRequestOptions,
  Response,
  HttpModule,
  Http,
  XHRBackend,
  RequestMethod
} from '@angular/http';

import {
  ResponseOptions
} from '@angular/http';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import {
  User
} from './models/user.model';
import {
  UserService
} from './user.service';

describe('Blog Service', () => {
  let mockBackend: MockBackend;
  // const users_list: Array<User> = [];

  // All heed this block - it is required so that the test injector
  // is properly set up. Without doing this, you won't get the
  // fake backend injected into Http.
  // Also, you need to inject MockBackend as a provider before you wire
  // it to replace XHRBackend with the provide function!  So this is all
  // extremely important to set up right.
  beforeEach(async (() => {
      TestBed.configureTestingModule({
          providers: [
              UserService,
              MockBackend,
              BaseRequestOptions,
              {
                  provide: Http,
                  deps: [MockBackend, BaseRequestOptions],
                  useFactory:
                      (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                          return new Http(backend, defaultOptions);
                      }
              }
          ],
          imports: [
              HttpModule
          ]
      });

      mockBackend = getTestBed().get(MockBackend);
      // this.users_list = [];
  }));

  it('should get users', done => {
      let userService: UserService;

      getTestBed().compileComponents().then(() => {
          mockBackend.connections.subscribe(
              (connection: MockConnection) => {
                  connection.mockRespond(new Response(
                      new ResponseOptions({
                          body: [{
                              _id: '1',
                              name: 'Steve Phelps',
                              editable: false
                          }]
                      })));
              });

          userService = getTestBed().get(UserService);
          expect(userService).toBeDefined();

          userService.getUsers().subscribe((users: User[]) => {
              console.log(users);
              expect(users.length).toBeDefined();
              expect(users.length).toEqual(1);
              expect(users[0]._id).toEqual('1');
              done();
          });
      });
  });


  it('should get users async',
      async (inject([UserService], (userService) => {
          mockBackend.connections.subscribe(
              (connection: MockConnection) => {
                  connection.mockRespond(new Response(
                      new ResponseOptions({
                          body: [{
                              _id: '1',
                              name: 'Steve Phelps',
                              editable: false
                          }]
                      })));
              });

          userService.getUsers().subscribe(
              (data) => {
                  expect(data.length).toBe(1);
                  expect(data[0]._id).toBe('1');
                  expect(data[0].name).toBe('Steve Phelps');
                  expect(data[0].editable).toBe(false);
              });
      })));

  it('should fetch a single user entry by a key',
      async (inject([UserService], (userService) => {
          mockBackend.connections.subscribe(
              (connection: MockConnection) => {
                  expect(connection.request.url).toMatch(/\/api\/users\/1/);
                  connection.mockRespond(
                      new Response(
                          new ResponseOptions({
                              body: {
                                  _id: '1',
                                  name: 'Steve Phelps',
                                  editable: false
                              }
                          }))
                  );
              }
          );

          const myUser = new User('1', 'Steve Phelps', false);

          userService.getUser(myUser).subscribe(
              (user) => {
                  expect(user._id).toBe('1');
                  expect(user.name).toBe('Steve Phelps');
                  expect(user.editable).toBe(false);
              }
          );
      })));

  it('should insert new user entries',
      async (inject([UserService], (userService) => {
          mockBackend.connections.subscribe((connection: MockConnection) => {
              expect(connection.request.method).toBe(RequestMethod.Post);
              expect(connection.request.url).toMatch(/\/api\/users/);

              connection.mockRespond(
                  new Response(
                      new ResponseOptions({
                          body: {
                              status: 201
                          }
                      })
                  )
              );
          });

          const myUser: User = new User('1', 'Steve Phelps', false);
          delete myUser._id;

          userService.create(myUser).subscribe(
              (successResult) => {
                  expect(successResult).toBeDefined();
                  expect(successResult.status).toBe(201);
              }
          );
      }))
  );

  it('should save updates to an existing user',
      async (inject([UserService], (userService) => {
          mockBackend.connections.subscribe(
              (connection: MockConnection) => {
                  expect(connection.request.method).toBe(RequestMethod.Put);
                  expect(connection.request.url).toMatch(/\/api\/users\/1/);

                  connection.mockRespond(
                      new Response(
                          new ResponseOptions({
                              body: {
                                  _id: '1',
                                  name: 'Steve Phelpsy',
                                  editable: false,
                                  status: 204
                              }
                          }))
                  );
              }
          );

          const user: User = new User('1', 'Steve Phelpsy', false);

          userService.update(user).subscribe(
              (successResult) => {
                  expect(successResult).toBeDefined();
                  expect(successResult.status).toBe(204);
              });
      })));

  it('should delete an existing user entry',
      async (inject([UserService], (userService) => {
          mockBackend.connections.subscribe(connection => {
              expect(connection.request.method).toBe(RequestMethod.Delete);
              expect(connection.request.url).toMatch(/\/api\/users\/1/);

              connection.mockRespond(
                  new Response(
                      new ResponseOptions({
                          body: {
                              status: 204
                          }
                      }))
              );
          });

          const myUser: User = new User('1', 'Steve Phelps', false);

          userService.destroy(myUser).subscribe(
              (successResult) => {
                  expect(successResult).toBeDefined();
                  expect(successResult.status).toBe(204);
              },
              (errorResult) => {
                  throw (errorResult);
              });
      })));
});
