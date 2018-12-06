import React from 'react';
import {NumberField} from '../wizard/components/form/Fields';
import {Group} from '../wizard/components/form/Form';
import EntityList from '../wizard/components/form/EntityList';

export default function (valueLabel) {
  return function PrismForm() {
    return <Group>
      <NumberField name='value' defaultValue={50} label={valueLabel}/>
      <NumberField name='prism' defaultValue={1} min={0} step={0.1} round={1}/>
      <NumberField name='angle' defaultValue={0}/>
      <NumberField name='rotation' defaultValue={0} step={5}/>
      <EntityList entity='face' name='face'/>
    </Group>;
  };
}