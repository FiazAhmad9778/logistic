import { classNames } from '@/helpers/classNames';
import { Col, Form } from 'react-bootstrap';
import { useFormContext, Controller } from 'react-hook-form';
import Select, { ActionMeta, CSSObjectWithLabel, GroupBase, OnChangeValue, OptionsOrGroups, Props } from 'react-select';

export type OptionDefaultFormat = {
  value: string;
  name: string;
  icon?: JSX.Element;
};

export const FormSelect = <
  Option extends OptionDefaultFormat,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option & OptionDefaultFormat> = GroupBase<Option & OptionDefaultFormat>,
>(
  props: Omit<
    Props<Option, IsMulti, Group> & {
      label?: string;
      name: string;
      error?: string;
      value?: OptionDefaultFormat;
      isMulti?: boolean;
      isSearchable?: boolean;
      placeholder?: string;
      defaultOption?: OptionDefaultFormat | OptionDefaultFormat[];
      renderValueStyles?: (e: OptionDefaultFormat) => CSSObjectWithLabel;
    },
    'defaultValue'
  >,
) => {
  const { label, name, isMulti, options, placeholder, isSearchable, renderValueStyles, ...rest } = props;
  const {
    control,
    setValue,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext();

  const onChange = (e: OptionDefaultFormat | OptionDefaultFormat[]) => {
    if (e && Array.isArray(e)) {
      setValue(
        name,
        e.map((e) => e.value),
      );

      return;
    }

    if (e && typeof e === 'object') {
      setValue(name, e.value);
    }
  };
  return (
    <Form.Group as={Col} className={classNames('form-group px-0')}>
      {label && (
        <div>
          <label className="form-label tx-12 tx-gray-600 ps-1">{label}</label>
        </div>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={
          getValues(name) && isMulti
            ? generateSelectDefaultValue(options ?? [], getValues(name))
            : getValues(name)
            ? generateSelectDefaultValue(options ?? [], getValues(name))[0]
            : ''
        }
        render={({ field }) => {
          return (
            <Select
              {...field}
              isMulti={isMulti}
              isSearchable={isSearchable}
              options={options}
              value={
                getValues(name) && isMulti
                  ? generateSelectDefaultValue(options ?? [], getValues(name))
                  : getValues(name)
                  ? generateSelectDefaultValue(options ?? [], getValues(name))[0]
                  : ''
              }
              onChange={onChange as (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => void}
              getOptionLabel={(e) => e?.name?.toString()}
              getOptionValue={(e) => e?.value?.toString()}
              placeholder={placeholder}
              className={classNames('py-0 d-flex justify-content-center')}
              styles={{
                control: (provided, { selectProps, isFocused }) => {
                  console.log('selectProps', selectProps, isFocused);
                  return {
                    ...provided,
                    width: '99.5%',
                    height: 'auto',
                    minHeight: '33px',
                    padding: '0px',
                    fontSize: '12px',
                    border: '2px solid',
                    borderColor:
                      errors[name] && typeof selectProps['value'] !== 'object'
                        ? '#f34343 !important'
                        : isFocused
                        ? '#06808b !important'
                        : '#ededf5 !important',
                    backgroundColor: '#fff',
                    backgroundClip: 'padding-box',
                    borderRadius: '5px',
                    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                    boxShadow: isFocused ? 'none' : '',
                    '&:hover': {
                      borderColor: '0 0 0px 2px #38cab3 !important',
                    },
                  };
                },
                indicatorsContainer: (provided) => ({
                  ...provided,
                  height: '35.4px',
                  padding: '0 0px 0px 4px',
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  padding: '0 0px 0px 4px',
                }),
                singleValue: (provided, { data }) => {
                  return {
                    ...provided,
                    display: 'flex', // To keep icon and label aligned
                    alignItems: 'center',
                    ...(renderValueStyles ? renderValueStyles(data) : { color: 'black' }),
                  };
                },
                multiValue: (styles, { data }) => {
                  return {
                    ...styles,
                    borderRadius: '5px',
                    ...(renderValueStyles ? renderValueStyles(data) : { color: 'black' }),
                  };
                },
                multiValueRemove: (styles) => {
                  return {
                    ...styles,
                    background: 'transparent',
                    '&:hover': {
                      background: 'transparent',
                    },
                  };
                },
                input: (styles) => {
                  return { ...styles, color: '#4d5875', margin: '0px' };
                },
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
              {...rest}
            />
          );
        }}
      />
      {errors && !watch(name) && (
        <span className={classNames(errors ? 'text-danger tx-12' : '')}>
          {((name && errors[name]?.message) as string) || ''}
        </span>
      )}
    </Form.Group>
  );
};

export default FormSelect;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateSelectDefaultValue = (options: OptionsOrGroups<any, any>, value: string | string[] | number) => {
  const finalVal = typeof value === 'number' ? value.toString() : value;
  return Array.isArray(value)
    ? options?.filter((e: OptionDefaultFormat) => {
        if (value?.includes(e.value)) {
          return {
            value: e.value,
            name: e.name,
          };
        }
      })
    : options?.filter((e) => e.value.toString() === finalVal);
};
