import { Annotation, Bell, Camera, Collection, DotsVertical, Key, Tag } from "icons/outline";

const Shortcuts = ({ title }) => {

  const shortcuts = [{
    icon: <Annotation width={40} height={40} className="flex-shrink-0 h-6 w-6 text-indigo-500" />,
    title: 'Messenger',
    subtitle: 'Internal organisation communications'
  }, {
    icon: <Bell width={40} height={40} className="flex-shrink-0 h-6 w-6 text-indigo-500" />,
    title: 'Notifications',
    subtitle: 'You will be sent a written notification'
  }, {
    icon: <Camera width={40} height={40} className="flex-shrink-0 h-6 w-6 text-indigo-500" />,
    title: 'Video Camera',
    subtitle: 'A camera that records video and usually audio'
  }, {
    icon: <Collection width={40} height={40} className="flex-shrink-0 h-6 w-6 text-indigo-500" />,
    title: 'Collection',
    subtitle: 'An accumulation of objects gathered for study, comparison, or exhibition or as a hobby'
  }, {
    icon: <Key width={40} height={40} className="flex-shrink-0 h-6 w-6 text-indigo-500" />,
    title: 'Key Chain',
    subtitle: 'Device that is used to hold security keys.'
  }, {
    icon: <Tag width={40} height={40} className="flex-shrink-0 h-6 w-6 text-indigo-500" />,
    title: 'Shopping Cart',
    subtitle: 'Temporary record of items selected for eventual purchase'
  }]

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between py-2 px-2 ring-1 ring-black ring-opacity-5">
        <div className="list-none flex flex-row overflow-auto w-0 min-w-full -mb-10 pb-10">
          <div
            className={`text-center py-3 px-3 cursor-pointer flex flex-1`}
          >
            <a className="text-gray-900 hover:text-indigo">
              {title}
            </a>
          </div>
          <div
            className={`text-center py-3 px-3 cursor-pointer`}
          >
            <a className="text-gray-500 hover:text-indigo">
            <DotsVertical width={18} height={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="relative grid gap-6 bg-body px-5 py-6 sm:gap-5 sm:p-5">
        {shortcuts.map((shortcut) => (<a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
          {shortcut.icon}
          <div className="ml-4">
            <p className="font-medium text-gray-900">
            {shortcut.title}
            </p>
            <p className="mt-1 text-xs text-gray-500">
            {shortcut.subtitle}
            </p>
          </div>
        </a>))}
      </div>
    </>
  );
};

export default Shortcuts;
