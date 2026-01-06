import { copy, paste } from '../../lib/operations';
import { useSystemState } from '../../lib/context/SystemState';
import { useBreakpoint } from '../../lib/hooks/useBreakpoint';

export const Tab_Main = () => {
  const { systemState, addNotification, isLoading, setIsLoading } =
    useSystemState();
  console;

  const { appSettings } = systemState;
  const { displayCol, customSavePath, useProjectPath } = appSettings;

  const handleCopy = async () => {
    console.log('copy');
    setIsLoading(true);
    const res: OperationRes = await copy(appSettings);
    setIsLoading(false);
    if (res.success) {
      if (!appSettings.enableNotifications) return;
      addNotification({
        type: 'success',
        title: 'Copied',
        message: res.message,
      });
    } else {
      addNotification({
        type: 'error',
        title: 'Error',
        message: res.message,
      });
    }
  };

  const handlePaste = async () => {
    console.log('paste');
    setIsLoading(true);
    const res: OperationRes = await paste(
      useProjectPath ? null : customSavePath,
      appSettings
    );
    setIsLoading(false);
    if (res.success) {
      if (!appSettings.enableNotifications) return;
      addNotification({
        type: 'success',
        title: 'Pasted',
        message: res.message,
      });
    } else {
      addNotification({
        type: 'error',
        title: 'Error',
        message: res.message,
      });
    }
  };

  const currentBreakpoint = useBreakpoint();

  const copyLabel = displayCol
    ? ['xs'].includes(currentBreakpoint)
      ? 'C'
      : 'Copy'
    : ['xs', 'sm'].includes(currentBreakpoint)
    ? 'C'
    : 'Copy';
  // const pasteLabel = ['xs'].includes(currentBreakpoint) ? 'P' : 'Pasta';
  const pasteLabel = displayCol
    ? ['xs'].includes(currentBreakpoint)
      ? 'P'
      : 'Paste'
    : ['xs', 'sm'].includes(currentBreakpoint)
    ? 'P'
    : 'Paste';

  return (
    <div
      className={`flex h-full p-1 hmd:p-2 gap-1 hmd:gap-2 ${
        displayCol ? 'flex-col' : 'flex-row'
      }`}
    >
      <Button
        onClick={handleCopy}
        label={copyLabel}
        isLoading={isLoading}
        xs={currentBreakpoint === 'xs'}
      />
      <Button
        onClick={handlePaste}
        label={pasteLabel}
        isLoading={isLoading}
        xs={currentBreakpoint === 'xs'}
      />
    </div>
  );
};

type ButtonProps = {
  onClick: () => void;
  label: string;
  isLoading: boolean;
  xs?: boolean;
};

const Button = ({ onClick, label, isLoading, xs }: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col h-full border-gray-500 justify-center bg-blk-200 hover:bg-blk-100 cursor-pointer 
        ${isLoading && 'cursor-wait pointer-events-none '}
        ${xs ? 'w-10' : 'w-full'}
        items-center
      `}
    >
      <h1
        className={`hsm:text-4xl hxl:text-2xl text-xl xl:text-2xl font-bold text-white`}
      >
        {label}
      </h1>
    </div>
  );
};
