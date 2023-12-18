"use client";

import { Transition } from '@headlessui/react'
import { Fragment, useId, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/inputs/Input'
import { FieldValues, useForm } from 'react-hook-form'

interface FadeInProps {
    delay: string | number;
    children: React.ReactNode;
}

const TransitionPage = () => {
  const [show, setShow] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  return (
    <>
      <div className="mx-auto my-16 flex max-w-md justify-start">
        <Button onClick={() => setShow(!show)}>Register</Button>
      </div>
      <Transition.Root show={show}>
        <BackgroundLayer />
        <SlideOverLayer>
          <h2 className="my-6 text-2xl font-bold">Register</h2>
          <div className="space-y-4">
            <FadeIn delay="delay-[300ms]">
              <Input
                label="First name"
                id='first-name'
                register={register}
                errors={errors}
              />
            </FadeIn>
            <FadeIn delay="delay-[600ms]">
              <Input
                label="Last name"
                id='last-name'
                register={register}
                errors={errors}
              />
            </FadeIn>
            <FadeIn delay="delay-[800ms]">
              <Input
                label="Email"
                id='email'
                register={register}
                errors={errors}
              />
            </FadeIn>
          </div>
          <div className="my-6">
            <FadeIn delay="delay-[900ms]">
              <Button onClick={() => setShow(false)}>Close</Button>
            </FadeIn>
          </div>
        </SlideOverLayer>
      </Transition.Root>
    </>
  )
}

const BackgroundLayer = () => (
  <Transition.Child
    enter="transition-opacity ease-in-out duration-500"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity ease-in-out duration-500"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="fixed inset-0 bg-gray-500 opacity-75" />
  </Transition.Child>
)

const SlideOverLayer = ({ children}: { children: React.ReactNode }) => (
  <Transition.Child
    as={Fragment}
    enter="transform transition ease-in-out duration-500"
    enterFrom="translate-x-full"
    enterTo="translate-x-0"
    leave="transform transition ease-in-out duration-500 delay-100"
    leaveFrom="translate-x-0"
    leaveTo="translate-x-full"
  >
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-2xl">
            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
              <div className="px-4 sm:px-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition.Child>
)

const FadeIn: React.FC<FadeInProps> = ({ delay, children }) => (
  <Transition.Child
    enter={`transition-all ease-in-out duration-700 ${delay}`}
    enterFrom="opacity-0 translate-y-6"
    enterTo="opacity-100 translate-y-0"
    leave="transition-all ease-in-out duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    {children}
  </Transition.Child>
)
 
export default TransitionPage;