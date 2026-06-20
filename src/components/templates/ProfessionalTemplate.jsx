import React from 'react';
import ArchitectGridTemplate from './ArchitectGridTemplate';
import AtsFriendlyTemplate from './AtsFriendlyTemplate';
import BlueHeaderTemplate from './BlueHeaderTemplate';
import BoardroomLedgerTemplate from './BoardroomLedgerTemplate';
import BoardroomPortraitTemplate from './BoardroomPortraitTemplate';
import BannerLetterTemplate from './BannerLetterTemplate';
import BusinessAnalystTemplate from './BusinessAnalystTemplate';
import CareerPivotTemplate from './CareerPivotTemplate';
import CeoBoardLetterTemplate from './CeoBoardLetterTemplate';
import ClassicEnterpriseTemplate from './ClassicEnterpriseTemplate';
import DataScientistTemplate from './DataScientistTemplate';
import EditorialPhotoTemplate from './EditorialPhotoTemplate';
import FinanceAnalystTemplate from './FinanceAnalystTemplate';
import FreshGraduateInternshipTemplate from './FreshGraduateInternshipTemplate';
import GamerArenaTemplate from './GamerArenaTemplate';
import GoldFrameTemplate from './GoldFrameTemplate';
import GovernmentTemplate from './GovernmentTemplate';
import HospitalityTemplate from './HospitalityTemplate';
import HrRecruiterTemplate from './HrRecruiterTemplate';
import InnovationHeaderTemplate from './InnovationHeaderTemplate';
import InternalPromotionTransferTemplate from './InternalPromotionTransferTemplate';
import LegalCounselTemplate from './LegalCounselTemplate';
import LeadershipClassicTemplate from './LeadershipClassicTemplate';
import MagazineCoverTemplate from './MagazineCoverTemplate';
import MarketingManagerTemplate from './MarketingManagerTemplate';
import MediaPersonTemplate from './MediaPersonTemplate';
import MedicalProfessionalTemplate from './MedicalProfessionalTemplate';
import MotionDesignerBoardTemplate from './MotionDesignerBoardTemplate';
import NurseClinicalTemplate from './NurseClinicalTemplate';
import OperationsManagerTemplate from './OperationsManagerTemplate';
import OperationsSlateTemplate from './OperationsSlateTemplate';
import PeopleBoardroomTemplate from './PeopleBoardroomTemplate';
import ProductManagerTemplate from './ProductManagerTemplate';
import ProjectManagerTemplate from './ProjectManagerTemplate';
import ProfessionalClinicalTemplate from './ProfessionalClinicalTemplate';
import ProfessionalEditorialTemplate from './ProfessionalEditorialTemplate';
import ProfessionalFormalTemplate from './ProfessionalFormalTemplate';
import ProfessionalPlainTemplate from './ProfessionalPlainTemplate';
import ProfileSidebarTemplate from './ProfileSidebarTemplate';
import ProfessionalRoleTemplate from './ProfessionalRoleTemplate';
import ProfessionalTechnicalTemplate from './ProfessionalTechnicalTemplate';
import SalesExecutiveTemplate from './SalesExecutiveTemplate';
import SlateLeadershipTemplate from './SlateLeadershipTemplate';
import ReferralCoverLetterTemplate from './ReferralCoverLetterTemplate';
import RelocationRemoteCandidateTemplate from './RelocationRemoteCandidateTemplate';
import SoftwareEngineerTemplate from './SoftwareEngineerTemplate';
import SolutionArchitectTemplate from './SolutionArchitectTemplate';
import SqlTerminalTemplate from './SqlTerminalTemplate';
import StudentNotesTemplate from './StudentNotesTemplate';
import SuperExclusiveTemplate from './SuperExclusiveTemplate';
import StrategyBarTemplate from './StrategyBarTemplate';
import TeacherEducatorTemplate from './TeacherEducatorTemplate';
import UltraExclusiveTemplate from './UltraExclusiveTemplate';
import UxDesignerTemplate from './UxDesignerTemplate';
import YoutubeCreatorTemplate from './YoutubeCreatorTemplate';
import ExecutiveLetterTemplate from './ExecutiveLetterTemplate';
import { professionalTemplateConfigs } from './professionalTemplateCatalog';

const ProfessionalTemplate = ({ variant = 'ats-friendly', body, design, profile, signature, recipient, skills = [], onUpdateBody }) => {
  const config = professionalTemplateConfigs[variant] || professionalTemplateConfigs['ats-friendly'];
  const accent = config.accent || design.color;
  const common = { body, design: { ...design, color: accent }, profile, signature, recipient, skills, onUpdateBody, config, accent };

  switch (config.layout) {
    case 'plain':
      return <AtsFriendlyTemplate {...common} />;
    case 'plain-alt':
      return <ProfessionalPlainTemplate {...common} />;
    case 'analyst':
      return <BusinessAnalystTemplate {...common} />;
    case 'pivot':
      return <CareerPivotTemplate {...common} />;
    case 'graduate':
      return <FreshGraduateInternshipTemplate {...common} />;
    case 'internal':
      return <InternalPromotionTransferTemplate {...common} />;
    case 'blueprint':
      return <SolutionArchitectTemplate {...common} />;
    case 'editorial':
      return <MediaPersonTemplate {...common} />;
    case 'editorial-alt':
      return <ProfessionalEditorialTemplate {...common} />;
    case 'clinical':
      return <MedicalProfessionalTemplate {...common} />;
    case 'clinical-alt':
      return <ProfessionalClinicalTemplate {...common} />;
    case 'clinical-soft':
      return <NurseClinicalTemplate {...common} />;
    case 'formal':
      return <LegalCounselTemplate {...common} />;
    case 'formal-alt':
      return <ProfessionalFormalTemplate {...common} />;
    case 'ledger':
      return <FinanceAnalystTemplate {...common} />;
    case 'data':
      return <DataScientistTemplate {...common} />;
    case 'product':
      return <ProductManagerTemplate {...common} />;
    case 'referral':
      return <ReferralCoverLetterTemplate {...common} />;
    case 'remote':
      return <RelocationRemoteCandidateTemplate {...common} />;
    case 'academic-soft':
      return <TeacherEducatorTemplate {...common} />;
    case 'service':
      return <HospitalityTemplate {...common} />;
    case 'sales':
      return <SalesExecutiveTemplate {...common} />;
    case 'campaign':
      return <MarketingManagerTemplate {...common} />;
    case 'technical':
      return <SoftwareEngineerTemplate {...common} />;
    case 'technical-alt':
      return <ProfessionalTechnicalTemplate {...common} />;
    case 'milestone':
      return <ProjectManagerTemplate {...common} />;
    case 'portfolio':
      return <UxDesignerTemplate {...common} />;
    case 'ops':
      return <OperationsManagerTemplate {...common} />;
    case 'people':
      return <HrRecruiterTemplate {...common} />;
    case 'civic':
      return <GovernmentTemplate {...common} />;
    case 'executive-portrait':
      return <BoardroomPortraitTemplate {...common} />;
    case 'executive-board-letter':
      return <CeoBoardLetterTemplate {...common} />;
    case 'executive-letter':
      return <ExecutiveLetterTemplate {...common} />;
    case 'executive-minimal-photo':
      return <EditorialPhotoTemplate {...common} />;
    case 'executive-blue-header':
      return <BlueHeaderTemplate {...common} />;
    case 'executive-banner-letter':
      return <BannerLetterTemplate {...common} />;
    case 'executive-classic':
      return <ClassicEnterpriseTemplate {...common} />;
    case 'executive-gold-frame':
      return <GoldFrameTemplate {...common} />;
    case 'executive-leadership-classic':
      return <LeadershipClassicTemplate {...common} />;
    case 'executive-people':
      return <PeopleBoardroomTemplate {...common} />;
    case 'executive-profile-sidebar':
      return <ProfileSidebarTemplate {...common} />;
    case 'executive-strategy-bar':
      return <StrategyBarTemplate {...common} />;
    case 'executive-board':
      return <BoardroomLedgerTemplate {...common} />;
    case 'executive-tech':
      return <InnovationHeaderTemplate {...common} />;
    case 'executive-ops':
      return <OperationsSlateTemplate {...common} />;
    case 'executive-slate':
      return <SlateLeadershipTemplate {...common} />;
    case 'artistic-gamer':
      return <GamerArenaTemplate {...common} />;
    case 'artistic-magazine':
      return <MagazineCoverTemplate {...common} />;
    case 'artistic-terminal':
      return <SqlTerminalTemplate {...common} />;
    case 'artistic-video':
      return <YoutubeCreatorTemplate {...common} />;
    case 'artistic-architect':
      return <ArchitectGridTemplate {...common} />;
    case 'artistic-student-notes':
      return <StudentNotesTemplate {...common} />;
    case 'artistic-motion-board':
      return <MotionDesignerBoardTemplate {...common} />;
    case 'executive-super-exclusive':
      return <SuperExclusiveTemplate {...common} />;
    case 'executive-ultra-exclusive':
      return <UltraExclusiveTemplate {...common} />;
    default:
      return <ProfessionalRoleTemplate {...common} />;
  }
};

export default ProfessionalTemplate;
