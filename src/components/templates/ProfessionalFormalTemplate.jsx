import React from 'react';
import { Body, Header, Signature } from './ProfessionalTemplateParts';

const ProfessionalFormalTemplate = (props) => (
  <div id="cover-letter-preview" className="mx-auto bg-white p-16 shadow-xl" style={{ width: '210mm', minHeight: '297mm', fontFamily: props.design.fontFamily || '"Helvetica Neue", Arial, sans-serif' }}>
    <div className="border-4 p-10" style={{ borderColor: props.accent }}>
      <Header profile={props.profile} />
      <Body body={props.body} design={{ ...props.design, fontFamily: props.design.fontFamily || '"Helvetica Neue", Arial, sans-serif' }} onUpdateBody={props.onUpdateBody} />
      <Signature signature={props.signature} profile={props.profile} accent={props.accent} />
    </div>
  </div>
);

export default ProfessionalFormalTemplate;
