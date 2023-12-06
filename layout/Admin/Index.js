import AdminStudioPage from './Studio';

const { Users } = require('icons/solid');
const { BASE_URL } = require('lib/env');
const { default: useSWR } = require('swr');
const { WidgetStatCard } = require('ui');

const AdminIndexPage = () => {
  const {data, error } = useSWR(`${BASE_URL}/studios`);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        Failed to load media data
      </div>
    )
  }
	return (
		<div>
			<div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title="Số lượng tiệm xăm"
            value={data?.total}
            icon={<Users width={16} height={16} />}
            type={'blue'}
          />
        </div>
        <div className="w-full md:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title="Số lượng nghệ sĩ xăm"
            value={'23'}
            icon={<Users width={16} height={16} />}
            type={'gray'}
          />
        </div>
        <div className="w-full md:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={'Số lượng khách hàng'}
            value={'23,465,563'}
            icon={<Users width={16} height={16} />}
            type={'indigo'}
          />
        </div>
        <div className="w-full md:w-2/4 lg:w-1/4 px-2">
          <WidgetStatCard
            title={'Số lượng package đăng ký'}
            value={'123'}
            icon={<Users width={16} height={16} />}
            type={'red'}
          />
        </div>
      </div>
      <div>
        <AdminStudioPage items={data?.studios} totalItem={data?.total} pageSize={10} />
      </div>
		</div>
	);
};

export default AdminIndexPage;