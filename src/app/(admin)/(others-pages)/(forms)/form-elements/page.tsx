import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import CheckboxComponents from '@/components/molecules/form-elements/CheckboxComponents';
import DefaultInputs from '@/components/molecules/form-elements/DefaultInputs';
import DropzoneComponent from '@/components/molecules/form-elements/DropZone';
import FileInputExample from '@/components/molecules/form-elements/FileInputExample';
import InputGroup from '@/components/molecules/form-elements/InputGroup';
import InputStates from '@/components/molecules/form-elements/InputStates';
import RadioButtons from '@/components/molecules/form-elements/RadioButtons';
import SelectInputs from '@/components/molecules/form-elements/SelectInputs';
import TextAreaInput from '@/components/molecules/form-elements/TextAreaInput';
import ToggleSwitch from '@/components/molecules/form-elements/ToggleSwitch';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Next.js Form Elements | TailAdmin - Next.js Dashboard Template',
  description:
    'This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template',
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle='From Elements' />
      <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
        <div className='space-y-6'>
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className='space-y-6'>
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
