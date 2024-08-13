import { FunctionComponent } from "react";

const ToDoSection: FunctionComponent = () => {
  return (
      <div className="absolute top-[6.5rem] left-[18.25rem] rounded-xl bg-generic-white-bg border-dark-100 border-[1px] border-dashed box-border w-[22.75rem] h-[56.25rem] overflow-hidden">
        <div className="absolute top-[1rem] left-[calc(50%_-_166px)] rounded-lg bg-generic-white w-[20.75rem] flex flex-row items-center justify-between p-[1rem] box-border">
          <div className="flex flex-row items-center justify-start gap-[1rem]">
            <div className="flex flex-row items-center justify-start gap-[0.5rem]">
              <img
                className="w-[1.5rem] relative h-[1.5rem] hidden"
                alt=""
                src="/iconsboldstop.svg"
              />
              <img
                className="w-[1.5rem] relative h-[1.5rem]"
                alt=""
                src="/status.svg"
              />
              <div className="relative font-semibold">Todo</div>
            </div>
            <div className="w-[1.25rem] rounded-37xl bg-primary-50 h-[1.25rem] flex flex-col items-center justify-center py-[0.125rem] px-[0.375rem] box-border text-[0.813rem] text-primary-500">
              <div className="self-stretch relative font-semibold">0</div>
            </div>
          </div>
          <img
            className="w-[1.5rem] relative h-[1.5rem]"
            alt=""
            src="/iconslinearadd.svg"
          />
        </div>
        <div className="absolute top-[6rem] left-[1rem] rounded-lg bg-generic-white-bg w-[20.75rem] flex flex-row items-center justify-center p-[0.75rem] box-border gap-[0.75rem] text-[1rem] text-dark-300">
          <img
            className="w-[1.5rem] relative h-[1.5rem]"
            alt=""
            src="/iconslinearadd1.svg"
          />
          <div className="relative font-semibold">Add task</div>
        </div>
      </div>
  );
};

export default ToDoSection;
