import { type FC, type Ref, useState, useEffect, forwardRef } from "react";
import { Switch } from "@headlessui/react";

import { classNames } from "../utils/classNames";

interface Props {
  onChange: (enabled: boolean) => void;
  ref: any;
}

const SwitchComponent: FC<Props> = forwardRef(
  ({ onChange }, ref: Ref<HTMLButtonElement>) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
      onChange(enabled);
    }, [enabled]);

    return (
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-slate-800" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
        )}
        ref={ref}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          )}
        />
      </Switch>
    );
  },
);

export default SwitchComponent;
