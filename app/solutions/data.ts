export type Solution = {
  slug: string;
  title: string;
  summary: string;
  featureSlug: string;
  focus: string;
  steps: [string, string][];
  questions: [string, string][];
  deliverables: [string, string][];
  collaboration: string;
  teamSteps: [string, string][];
  next: [string, string][];
  success: [string, string][];
  heroImage: string;
  heroBackground: string;
  teamImage: string;
};

export const solutions: Solution[] = [
  {
    slug: 'projects-property', title: 'Projects & Property', featureSlug: 'property-project-management',
    summary: 'Keep the details of each development together, from plot availability and pricing to sales and finance.',
    focus: 'Project and sales teams can work from the same current inventory, while leaders see what has changed.',
    steps: [['Structure the development', 'Set up phases, blocks, plot dimensions, and project-specific commercial rules.'], ['Publish a current inventory', 'Keep available, reserved, and sold plots visible with their current pricing.'], ['Equip the sales desk', 'Let assigned team members work from the plot record and its project context.']],
    questions: [['Which plots can we sell now?', 'See the current inventory position before a buyer conversation begins.'], ['What is the approved price?', 'Review pricing and plot attributes in the same record, instead of comparing sheets.'], ['Who can update this project?', 'Use project assignments to keep changes within the responsible team.']],
    deliverables: [['Project structure', 'Phases and blocks organize the development as it is managed in practice.'], ['Plot position', 'Dimensions, pricing, and availability stay with each property record.'], ['Shared sales context', 'The sales desk works from the same project and plot data.']],
    collaboration: 'Project managers establish the structure, commercial teams keep inventory current, and sales teams use that record when moving a plot forward. Leaders can review position without rebuilding it from separate updates.',
    teamSteps: [['Project team', 'Defines phases, blocks, plot types, and the rules for the development.'], ['Commercial team', 'Maintains pricing and availability as project conditions change.'], ['Sales team', 'Uses the current plot record for reservations and sales activity.']],
    next: [['Create the project', 'Start with the phases and blocks that reflect the real development.'], ['Load the inventory', 'Bring each plot and its dimensions into the structured workspace.'], ['Set selling context', 'Attach pricing and availability to the relevant plots.'], ['Start coordinated sales', 'Let assigned users work from the current record.']],
    success: [['Fewer version conflicts', 'Teams refer to one plot position rather than competing spreadsheets.'], ['Clearer selling decisions', 'Availability, dimensions, and price are read together.'], ['Stronger project oversight', 'Leaders see inventory and sales activity in project context.']],
    heroImage: '/product-screens/admin.webp', heroBackground: '/solutions/hero-backgrounds/projects.webp', teamImage: '/product-screens/workspace.webp',
  },
  {
    slug: 'sales-lifecycle', title: 'Sales Lifecycle', featureSlug: 'sales-contracts-installments',
    summary: 'Follow a property sale from the first booking through payments, changes, and final settlement.',
    focus: 'Sales, accounts, and recovery teams can see the same contract history and respond with the right context.',
    steps: [['Create the agreement', 'Capture the buyer, property, terms, and installment schedule together.'], ['Follow the money', 'Compare expected installments with receipts and the remaining position.'], ['Handle lifecycle changes', 'Record transfers, cancellations, and resale without losing the original context.']],
    questions: [['What is due on this contract?', 'Read the planned schedule alongside recorded collections.'], ['What has changed since signing?', 'Follow receipts, commissions, and lifecycle actions from the original agreement.'], ['What should the next team know?', 'Keep customer, property, and financial history available in one place.']],
    deliverables: [['Contract record', 'The buyer, plot, price, and terms establish the source of the sale.'], ['Collection schedule', 'Installments show the expected position over time.'], ['Traceable changes', 'Receipts, transfers, cancellation, and resale remain linked.']],
    collaboration: 'Sales creates the agreement, finance follows collections, and managers review changes against the same customer position. No handoff needs to discard the story of the original contract.',
    teamSteps: [['Sales desk', 'Confirms the property, buyer, price, and commercial terms.'], ['Finance', 'Records receipts against the installment obligations they satisfy.'], ['Management', 'Reviews transfer, cancellation, or resale in full contract context.']],
    next: [['Select the property', 'Start from the current plot record and approved commercial position.'], ['Agree the terms', 'Create the buyer contract and installment schedule.'], ['Record collections', 'Keep receipts and outstanding amounts connected.'], ['Manage change', 'Carry the lifecycle forward with its earlier history intact.']],
    success: [['One customer position', 'Sales and finance see the same agreement and payment history.'], ['Obligations stay visible', 'Expected installments and actual receipts can be understood together.'], ['Changes remain explainable', 'Later actions retain the contract and property they came from.']],
    heroImage: '/product-screens/sales.webp', heroBackground: '/solutions/hero-backgrounds/sales.webp', teamImage: '/product-screens/vouchers.webp',
  },
  {
    slug: 'land-acquisition', title: 'Land Acquisition', featureSlug: 'landowner-management',
    summary: 'Keep each landowner agreement, payment, allocation, and remaining obligation with its project.',
    focus: 'Acquisition, management, and finance can review the same agreement and know what remains to be settled.',
    steps: [['Record the commitment', 'Keep landowner terms with the relevant project and agreement.'], ['Follow scheduled payments', 'Review planned obligations against completed payment activity.'], ['Track allocation', 'See distribution and assigned land in the context of the original terms.']],
    questions: [['What did we agree?', 'Find the landowner terms and their project context.'], ['What remains payable?', 'Use the schedule and payment activity to understand the commitment.'], ['How has land been allocated?', 'Review distribution and position without losing the agreement behind it.']],
    deliverables: [['Agreement context', 'Landowner terms are recorded with the project they support.'], ['Payment position', 'Scheduled and completed activity can be reviewed together.'], ['Allocation view', 'Distribution decisions remain connected to the source agreement.']],
    collaboration: 'Acquisition manages the agreement, finance understands the payment obligation, and project teams see how allocation affects the development. The commitment stays recognizable across all three views.',
    teamSteps: [['Acquisition', 'Captures agreement terms and the landowner relationship.'], ['Finance', 'Follows scheduled payments and completed activity.'], ['Project team', 'Reviews allocation and distribution against the commitment.']],
    next: [['Create the landowner record', 'Establish the person or entity and project relationship.'], ['Capture the agreement', 'Record terms that determine future obligations.'], ['Track the schedule', 'Keep payments in view as the commitment progresses.'], ['Review the position', 'Connect distribution and allocation back to the agreement.']],
    success: [['Commitments are legible', 'Teams can explain what was agreed and what remains due.'], ['Payments have context', 'Finance can read activity against the schedule.'], ['Allocation is traceable', 'Land position remains tied to the original commitment.']],
    heroImage: '/product-screens/landowners.webp', heroBackground: '/solutions/hero-backgrounds/land.webp', teamImage: '/product-screens/admin.webp',
  },
  {
    slug: 'accounting-finance', title: 'Accounting & Finance', featureSlug: 'accounting-vouchers',
    summary: 'See how customer receipts, project expenses, payroll, and other obligations reach the books.',
    focus: 'Finance teams can trace each balance back to the activity that created it.',
    steps: [['Prepare project books', 'Use the project chart of accounts and ledger setup.'], ['Post with checks', 'Validate balance, ownership, ledger context, and the related source record.'], ['Read the result', 'Derive ledgers and statements from the entries that were actually posted.']],
    questions: [['Does this entry belong here?', 'Check project ownership and ledger context before posting.'], ['Is the voucher balanced?', 'Apply the same posting gate to financial entries.'], ['Where did this balance come from?', 'Move from statements and ledgers toward the posted source activity.']],
    deliverables: [['Controlled entries', 'A common validation path checks each financial posting.'], ['Project-ledger context', 'Accounts are used within the project that owns the work.'], ['Derived reporting', 'Statements follow posted data, rather than a separate manual total.']],
    collaboration: 'Operational teams create receipts and payments in business context; finance validates and posts them; leadership reviews ledgers and statements built from those accepted entries.',
    teamSteps: [['Operations', 'Starts from the transaction or business record that needs financial treatment.'], ['Finance', 'Reviews balance, account ownership, and posting context.'], ['Leadership', 'Uses the resulting ledgers and statements to understand position.']],
    next: [['Set up accounts', 'Establish the project chart and required ledgers.'], ['Connect source records', 'Keep receipts, payments, and vouchers tied to their origin.'], ['Apply the posting gate', 'Check each entry before it becomes part of the books.'], ['Review statements', 'Read reports derived from valid posted entries.']],
    success: [['Stronger integrity', 'Entries without valid context are stopped before saving.'], ['Explainable balances', 'Reporting has a path back to posted activity.'], ['One financial picture', 'Operational events and accounting records tell the same story.']],
    heroImage: '/product-screens/accounts.webp', heroBackground: '/solutions/hero-backgrounds/accounting.webp', teamImage: '/product-screens/vouchers.webp',
  },
  {
    slug: 'payroll-people', title: 'Payroll & People', featureSlug: 'payroll-partners',
    summary: 'Prepare payroll with employee, attendance, earnings, and deduction details available for review.',
    focus: 'Authorized teams can review each calculation and approval before salaries are paid.',
    steps: [['Organize relationships', 'Maintain employee, partner, vendor, and investor profiles.'], ['Review payroll', 'Move runs through the appropriate approval before posting.'], ['See obligations', 'Keep liabilities and commissions visible beside the project books.']],
    questions: [['Who is involved in this project?', 'Understand the employee and partner relationships behind the work.'], ['Has this run been approved?', 'Separate preparation, review, and posting in the payroll lifecycle.'], ['What obligation follows?', 'Make approved liabilities and commissions visible to finance.']],
    deliverables: [['People records', 'Profiles establish the participants and their relationships.'], ['Approved runs', 'Payroll moves through review before it becomes a financial obligation.'], ['Visible liabilities', 'Costs and commitments remain in the project-aware finance view.']],
    collaboration: 'People teams maintain profiles and prepare runs, approvers review decisions, and finance reads the liabilities that result. Partner commissions and vendor obligations stay in view alongside employee costs.',
    teamSteps: [['People operations', 'Maintains accurate profiles and prepares payroll activity.'], ['Approvers', 'Reviews each run before it is posted.'], ['Finance', 'Tracks liabilities, commissions, and partner commitments.']],
    next: [['Organize profiles', 'Create the people and partner records used by the team.'], ['Prepare a run', 'Calculate the payroll activity for review.'], ['Approve and post', 'Move an accepted run into financial context.'], ['Monitor obligations', 'Review employee and partner liabilities together.']],
    success: [['Clearer accountability', 'Profiles and approval stages show who owns each action.'], ['Costs stay connected', 'Approved payroll has a visible financial consequence.'], ['Broader obligation view', 'Partner and people commitments can be read together.']],
    heroImage: '/product-screens/employees.webp', heroBackground: '/solutions/hero-backgrounds/payroll.webp', teamImage: '/product-screens/workspace.webp',
  },
  {
    slug: 'recovery-administration', title: 'Recovery & Administration', featureSlug: 'recovery-operations',
    summary: 'Track overdue installments and follow-up work while keeping project access under control.',
    focus: 'Recovery teams can act from the current customer account, and administrators can control who sees each project.',
    steps: [['Read the account', 'Review contract dues and actual receipts before contacting the customer.'], ['Record the next action', 'Capture calls, commitments, follow-up dates, and notice progression.'], ['Protect the workflow', 'Use project assignments, capabilities, and audit history for accountable access.']],
    questions: [['What is actually outstanding?', 'Look at dues and receipt history together.'], ['What did the customer promise?', 'Keep calls and commitments attached to the account.'], ['Who can take the next step?', 'Match capability with assignment to the active project.']],
    deliverables: [['Collection board', 'Due amounts, commitments, and follow-ups sit together.'], ['Notice workflow', 'Escalation retains the earlier customer and payment context.'], ['Administrative oversight', 'Sessions, audit, backup, and restore support controlled operation.']],
    collaboration: 'Recovery teams see the current contract position, managers follow commitments and notices, and administrators set project boundaries. The same record supports action and oversight.',
    teamSteps: [['Collector', 'Reviews the account and records each call or commitment.'], ['Manager', 'Tracks promised dates and escalation to notice workflows.'], ['Administrator', 'Controls access and reviews sessions or audit activity.']],
    next: [['Open the customer position', 'Start from the contract and receipt record.'], ['Plan follow-up', 'Record calls, promises, and the next date.'], ['Escalate when needed', 'Use the notice workflow with prior history intact.'], ['Review access', 'Check project assignments and audit activity.']],
    success: [['More informed contact', 'Collectors understand dues and payments before acting.'], ['Accountable follow-up', 'Promises, dates, and notices remain attached to the account.'], ['Controlled operation', 'Access boundaries and audit records support oversight.']],
    heroImage: '/product-screens/oversight.webp', heroBackground: '/solutions/hero-backgrounds/recovery.webp', teamImage: '/product-screens/admin.webp',
  },
];

export const solutionBySlug = (slug: string) => solutions.find((solution) => solution.slug === slug);
