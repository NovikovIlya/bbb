import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'
import StudentTable from './StudentTable'

const mockData = [
	{
		key: '1',
		number: 1,
		name: 'Задание 1',
		level: ''
	},
	{
		key: '2',
		number: 2,
		name: 'Задание 2',
		level: ''
	},
	{
		key: '3',
		number: 3,
		name: 'Задание 3',
		level: ''
	},
	{
		key: '4',
		number: 4,
		name: 'Задание 4',
		level: ''
	},
	{
		key: '5',
		number: 5,
		name: 'Задание 5',
		level: 'Срдний'
	}
]

const ModalStudent = ({ openModalStudent, handleOk, setIsModalStudent }: any) => {
    const [dataSource,setDataSource] = useState(mockData)
	const [form] = Form.useForm()

	const onFinish = (values: any) => {
        console.warn('123')
        console.table(dataSource)
		console.log('Success:', values)
	}

    const handleCancelModal = () => {
        if(form.getFieldValue('rep') || form.getFieldValue('date') || form.getFieldValue('gradeKFU') || form.getFieldValue('gradeProf')){
            const yes = typeof window !== 'undefined' && window.confirm("Если вы закроете окно, данные не сохраняться. Вы хотите продолжить?");
            if(yes) {
                form.resetFields()
                setIsModalStudent(false)
            } else {
                return
            }
        }
		setIsModalStudent(false)
	
		
	}

	return (
		<Modal
			title="Сформируйте отчет по студенту"
			width={900}
			style={{ paddingBottom: '150px'}}
			open={openModalStudent}
			onOk={handleOk}
			onCancel={handleCancelModal}
			footer={false}
		>
			<div className="p-5">
				<Form onFinish={onFinish} form={form}>
					<Row>
						<Col span={12}>
							<span>Отзыв руководителя практики</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'rep'}>
								<Input.TextArea maxLength={100} placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

					

					<Row>
						<Col span={12}>
							<span>Оценка руководителя практики от КФУ</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'gradeKFU'}>
								<Input placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

                    <Row>
						<Col span={12}>
							<span>Оценка руководителя практики от проф.организации</span>
						</Col>
						<Col span={12}>
							<Form.Item name={'gradeProf'}>
								<Input placeholder="Ввести" />
							</Form.Item>
						</Col>
					</Row>

                    <Row>
                        <StudentTable dataSource={dataSource} setDataSource={setDataSource}/>
                    </Row>

					<div className="flex justify-end">
						<Button htmlType="submit">Сформировать отчет</Button>
					</div>
				</Form>
			</div>
		</Modal>
	)
}

export default ModalStudent
