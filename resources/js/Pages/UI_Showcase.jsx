import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import Radio from '@/Components/Radio';

export default function UIShowcase() {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('option1');

    return (
        <AuthenticatedLayout
            header={
                <h2 className="section-title">
                    UI Component Showcase
                </h2>
            }
        >
            <Head title="UI Component Showcase" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    {/* Cards Section */}
                    <Card className="mb-8">
                        <Card.Header>
                            <Card.Title>Card Components</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Sample Card 1</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <p className="text-gray-600">This is a sample card with some content.</p>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="primary">Action</Button>
                                    </Card.Footer>
                                </Card>
                                
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Sample Card 2</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <p className="text-gray-600">Another sample card with different content.</p>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="secondary">Action</Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Forms Section */}
                    <Card className="mb-8">
                        <Card.Header>
                            <Card.Title>Form Components</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="name" value="Full Name" required />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            placeholder="Enter your full name"
                                        />
                                        <InputError message="Name is required" className="mt-1" />
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="email" value="Email Address" required />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="phone" value="Phone Number" />
                                        <TextInput
                                            id="phone"
                                            type="tel"
                                            className="mt-1 block w-full"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="company" value="Company" />
                                        <TextInput
                                            id="company"
                                            type="text"
                                            className="mt-1 block w-full"
                                            placeholder="Enter your company"
                                        />
                                    </div>
                                </div>
                                
                                <div className="mt-6">
                                    <InputLabel htmlFor="message" value="Message" />
                                    <textarea
                                        id="message"
                                        className="form-input mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 placeholder:text-gray-400 transition-all"
                                        rows="4"
                                        placeholder="Enter your message"
                                    ></textarea>
                                </div>
                                
                                {/* Checkbox and Radio Example */}
                                <div className="mt-6">
                                    <div className="mb-4">
                                        <label className="label">Checkbox Example</label>
                                        <div className="flex items-center">
                                            <Checkbox
                                                id="checkbox-example"
                                                checked={checked}
                                                onChange={(e) => setChecked(e.target.checked)}
                                                className="form-checkbox"
                                            />
                                            <label htmlFor="checkbox-example" className="ml-2 text-sm text-gray-700">
                                                I agree to the terms and conditions
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="label">Radio Button Example</label>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <Radio
                                                    id="radio-option1"
                                                    name="radio-example"
                                                    value="option1"
                                                    checked={radioValue === 'option1'}
                                                    onChange={(e) => setRadioValue(e.target.value)}
                                                    className="form-radio"
                                                />
                                                <label htmlFor="radio-option1" className="ml-2 text-sm text-gray-700">
                                                    Option 1
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <Radio
                                                    id="radio-option2"
                                                    name="radio-example"
                                                    value="option2"
                                                    checked={radioValue === 'option2'}
                                                    onChange={(e) => setRadioValue(e.target.value)}
                                                    className="form-radio"
                                                />
                                                <label htmlFor="radio-option2" className="ml-2 text-sm text-gray-700">
                                                    Option 2
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <Radio
                                                    id="radio-option3"
                                                    name="radio-example"
                                                    value="option3"
                                                    checked={radioValue === 'option3'}
                                                    onChange={(e) => setRadioValue(e.target.value)}
                                                    className="form-radio"
                                                />
                                                <label htmlFor="radio-option3" className="ml-2 text-sm text-gray-700">
                                                    Option 3
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-end mt-6">
                                    <Button variant="outline" className="mr-2">Cancel</Button>
                                    <Button variant="primary">Submit</Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>

                    {/* Tables Section */}
                    <Card className="mb-8">
                        <Card.Header>
                            <Card.Title>Table Components</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table>
                                <Table.Head>
                                    <Table.Row>
                                        <Table.HeadCell>ID</Table.HeadCell>
                                        <Table.HeadCell>Name</Table.HeadCell>
                                        <Table.HeadCell>Email</Table.HeadCell>
                                        <Table.HeadCell>Status</Table.HeadCell>
                                        <Table.HeadCell>Actions</Table.HeadCell>
                                    </Table.Row>
                                </Table.Head>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>1</Table.Cell>
                                        <Table.Cell>John Doe</Table.Cell>
                                        <Table.Cell>john@example.com</Table.Cell>
                                        <Table.Cell><span className="badge badge-success">Active</span></Table.Cell>
                                        <Table.Cell>
                                            <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                            <Button variant="danger" size="sm">Delete</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>2</Table.Cell>
                                        <Table.Cell>Jane Smith</Table.Cell>
                                        <Table.Cell>jane@example.com</Table.Cell>
                                        <Table.Cell><span className="badge badge-warning">Pending</span></Table.Cell>
                                        <Table.Cell>
                                            <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                            <Button variant="danger" size="sm">Delete</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>3</Table.Cell>
                                        <Table.Cell>Robert Johnson</Table.Cell>
                                        <Table.Cell>robert@example.com</Table.Cell>
                                        <Table.Cell><span className="badge badge-success">Active</span></Table.Cell>
                                        <Table.Cell>
                                            <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                            <Button variant="danger" size="sm">Delete</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Card.Body>
                    </Card>

                    {/* Buttons Section */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Button Components</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <Button variant="primary" className="w-full mb-2">Primary</Button>
                                    <Button variant="secondary" className="w-full mb-2">Secondary</Button>
                                    <Button variant="accent" className="w-full mb-2">Accent</Button>
                                </div>
                                <div>
                                    <Button variant="success" className="w-full mb-2">Success</Button>
                                    <Button variant="warning" className="w-full mb-2">Warning</Button>
                                    <Button variant="danger" className="w-full mb-2">Danger</Button>
                                </div>
                                <div>
                                    <Button variant="outline" className="w-full mb-2">Outline</Button>
                                    <Button variant="ghost" className="w-full mb-2">Ghost</Button>
                                    <Button variant="primary" className="w-full mb-2" disabled>Disabled</Button>
                                </div>
                                <div>
                                    <Button variant="primary" size="sm" className="w-full mb-2">Small</Button>
                                    <Button variant="primary" size="md" className="w-full mb-2">Medium</Button>
                                    <Button variant="primary" size="lg" className="w-full mb-2">Large</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}