import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { User } from './user';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    service = new ApiService({} as any); // HttpClient not used
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch users successfully', async () => {
    const mockUsers: User[] = [{ id: 1, description: 'Test', creationDate: '2024-01-01', createdBy: 'admin' }] as any;

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUsers
    });

    const result = await service.getUsers();

    expect(fetch).toHaveBeenCalledWith(`${environment.apiUrl}/simple-spa/v1/api/users/all`);
    expect(result).toEqual(mockUsers);
  });

  it('should throw error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });

    await expect(service.getUsers()).rejects.toThrow('API error 500: Internal Server Error');
  });
});
